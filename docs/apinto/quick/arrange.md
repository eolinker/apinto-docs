# 部署
Apinto 完全基于 Golang 开发，不基于现有第三方产品，因此具有外部依赖少，部署简单等特点。

各位可以通过以下方式进行部署：

## 下载官方提供的安装包安装（推荐）

1.下载安装包并解压

```shell
wget https://github.com/eolinker/apinto/releases/download/v0.7.0/apinto-v0.7.0.linux.x64.tar.gz && tar -zxvf apinto-v0.7.0.linux.x64.tar.gz && cd apinto
```

2.启动网关：

```shell
./apinto start
```

**备注**：若网关启动不成功可以在/var/log/apinto目录下的日志文件排查原因，一般是路由监听端口被占用的情况，可以在apinto执行文件相同目录下的config.yml修改路由监听端口，具体配置详情[点此跳转](/docs/apinto/quick/quick_course.md)。

## 编译源码进行安装
访问https://github.com/eolinker/apinto ，下载源码后可执行编译脚本或者打包成安装包

1.从官方github仓库clone源码并且进入到项目中

```shell
git clone https://github.com/eolinker/apinto.git && cd apinto
```

2.编译脚本，编译后的可执行文件输出到当前目录下的out文件夹内

```
./build/cmd/build.sh  
```

3.进入程序所在目录并且运行程序

```shell
cd out
cd apinto-{time_stamp} #apinto-{time_stamp}目录是按编译时间生成的
cp config.yml.tmp config.yml #拷贝模板配置文件作为程序运行的配置文件
./apinto start
```

**备注**：

* 由于代码会不定时更新，不推荐使用该方式进行安装。



## Docker

Docker部署教程[点此](https://hub.docker.com/repository/docker/eolinker/apinto-gateway)进行跳转



## Kubernetes集群部署应用

APINTO容器有两个可挂载的目录：

* `/var/lib/apinto`:目录内有**data**(数据文件放置目录),**log**(日志放置目录),**extends**(扩展仓库目录)

* `/etc/apinto`:存放了config.yml文件，该文件用于指定节点的路由监听端口，ssl证书等信息。详细信息

  [点此](/docs/apinto/quick/quick_course.md )进行跳转。

**备注**：`/etc/apinto`目录不挂载的话将会使用默认配置文件，默认admin端口为9400，http端口为8080。

### 创建Service

以NodePort类型为例，端口配置请以应用的配置文件为标准。

注意：该服务需要与APINTO的pod在同一命名空间内。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: apinto-gateway-svc #服务名
spec:
  selector: 
    app: apinto-gateway  #绑定标签为app: apinto-gateway的POD
  type: NodePort # 默认为ClusterIP 集群内可访问，NodePort 节点可访问，LoadBalancer负载均衡模式
  ports:
    - port: 8080      #默认http端口
    	name: apintohttp
      targetPort: 8080  # 容器端口
      nodePort: 31080   # 节点端口，范围固定 30000 ~ 32767
    - port: 9400      #默认admin端口
      name: apintoadmin
      targetPort: 9400  # 容器端口
      nodePort: 31094   # 节点端口，范围固定 30000 ~ 32767
```

### 部署POD(不挂载目录)

不挂载容器目录可以使用deployment进行部署。使用replicas指定副本数量，创建该deployment之后所有POD会自动加入集群。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apinto-gateway
spec:
  replicas: 3
  selector:  
    matchLabels:
      app: apinto-gateway #POD标签，用于与Service绑定。
  # 定义 Pod 相关数据
  template:
    metadata:
      labels:
        app: apinto-gateway #pod的标签
    spec:
      # 定义容器
      containers:
      - name: apinto-gateway # 容器名字
        image: eolinker/apinto-gateway:latest
        imagePullPolicy: Always
        lifecycle:
          postStart: #容器运行加入集群脚本
            exec:
              command: ["/bin/bash", "-c", "nohup bash /apinto/join.sh >nohup.out 2>&1 &"]
          preStop:  #容器关闭前运行离开集群脚本
            exec:
              command: ["/bin/bash","-c","bash /apinto/leave.sh"]
        env:
        - name: POD_IP #将pod_id加入环境变量
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: SVC_NAME  #将apinto服务名加入环境变量
          value: "apinto-gateway-svc"
        - name: SVC_NAMESPACE #指定apinto服务所在命名空间
          value: "default"
        - name: APINTO_ADMIN_PORT
          value: "9400"
        - name: SVC_TOKEN  #将访问k8s集群的TOKEN加入环境变量
          value: "${TOKEN}"
```

**备注**：

* 若k8s集群开启了token访问模式，则需要在配置内传入token作为环境变量
* 需指定apinto服务名以及其命名空间作为POD环境变量
* 若只想部署单个POD，可以将配置文件内的`lifecycle`和`env`环境变量删除。



### 部署POD(挂载目录)

**注意**：当要挂载存放日志和数据文件的`/var/lib/apinto`目录时，一个PVC只能被一个POD使用。

以下均以挂载`/var/lib/apinto`为示例。

#### Local卷本地挂载

使用Local卷需要创建SC,PV以及PVC。建议PV配置nodeAffinity，使挂载目录分配到所有worker节点。

##### 创建StorageClass 存储类

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
reclaimPolicy: Retain  #回收策略
volumeBindingMode: WaitForFirstConsumer #延迟卷绑定使得调度器在为 PersistentVolumeClaim 选择一个合适的 PersistentVolume 时能考虑到所有 Pod 的调度限制。
```



##### 创建PersistentVolume

使用nodeAffinity指定具体的worker节点挂载。

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: apinto-pv1 #pv名
  labels:
    pv: local-pv1 #标签，可用来匹配具体的pvc
spec:
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-storage
  local:
    path: /mnt/apinto/ #节点目录
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname #表示pv创建在含有kubernetes.io/hostname:node1 标签的节点
          operator: In 
          values:
          - node1
```

备注：要创建多个PV时需要修改示例里metadata的pv名以及标签，其他配置仅作参考。



##### 创建PersistentVolumeClaim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-local-node1  #pvc名
spec:
  storageClassName: local-storage
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  selector:  #选择器，可用来匹配特定的pv。也可不配置selector，交由调度器匹配。
    matchLabels:
      pv: local-pv1
```

备注：要创建多个PVC时需要修改示例里metadata的pvc名以及spec-selector-matchLabels匹配标签，其他配置仅作参考。



##### 创建POD

以下为多个POD集群部署的示例，单个POD部署删除lifecycle以及env即可。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apinto-pod1  #pod名
  labels: 
    app: apinto-gateway #标签，用于绑定Service
spec:
    volumes:
    - name: pv-local
      persistentVolumeClaim:
        claimName: pvc-local-node1 #使用的pvc
    containers:
    - name: apinto-gateway 
      image: eolinker/apinto-gateway:latest 
      imagePullPolicy: Always 
      lifecycle:
        postStart: #容器运行前启动加入集群脚本
          exec:
            command: ["/bin/bash", "-c", "nohup bash /apinto/join.sh >nohup.out 2>&1 &"]
        preStop:  #容器关闭前运行离开集群脚本
          exec:
            command: ["/bin/bash","-c","bash /apinto/leave.sh"]
      volumeMounts:  #目录挂载
      - mountPath: /var/lib/apinto
        name: pv-local
      env:
      - name: POD_IP #将pod_id加入环境变量
        valueFrom:
          fieldRef:
            fieldPath: status.podIP
      - name: SVC_NAME  #将apinto服务名加入环境变量
        value: "apinto-gateway-svc"
      - name: SVC_NAMESPACE #指定apinto服务所在命名空间
        value: "default"
      - name: APINTO_ADMIN_PORT
        value: "9400"
      - name: SVC_TOKEN  #将master节点的TOKEN加入环境变量
        value: "${TOKEN}"
```



#### 静态NFS卷

创建静态NFS PV很简单，指定nfs的服务器地址即可。需要注意的是NFS Server要能与k8s集群内使用nfs卷的worker节点连通。

##### 创建PersistentVolume

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: apinto-nfs-pv1 #pv名
  labels:
    pv: nfs-pv1 #标签，可用来匹配具体的pvc
spec:
  capacity:
    storage: 1Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain 
  storageClassName: nfs
  nfs:
    path: /nfs/data/apinto #nfs服务器上的挂载目录
    server: ${nfs_server_ip}
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname #表示pv创建在含有kubernetes.io/hostname:node1 标签的节点
          operator: In 
          values:
          - node1 
```

**备注**: 需要在部署了NFS的服务器上，给要挂载的共享目录分配权限。



##### 创建PersistentVolumeClaim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc1
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: nfs
  selector:
    matchLabels:
      pv: nfs-pv1
```



##### 创建POD

以下为多个POD集群部署的示例，单个POD部署删除lifecycle以及env即可。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apinto-nfs-pod1  #pod名
  labels:
    app: apinto-gateway
spec:
    volumes:
    - name: pv-nfs
      persistentVolumeClaim:
        claimName: nfs-pvc1 #使用的pvc
    containers:
    - name: nfs-apinto 
      image: eolinker/apinto-gateway:latest
      imagePullPolicy: Always
      lifecycle:
        postStart: #容器运行前启动加入集群脚本
          exec:
            command: ["/bin/bash", "-c", "nohup bash /apinto/join.sh >nohup.out 2>&1 &"]
        preStop:  #容器关闭前运行离开集群脚本
          exec:
            command: ["/bin/bash","-c","bash /apinto/leave.sh"]
      volumeMounts:
      - mountPath: /var/lib/apinto
        name: pv-nfs
      env:
      - name: POD_IP #将pod_id加入环境变量
        valueFrom:
          fieldRef:
            fieldPath: status.podIP
      - name: SVC_NAME  #将服务名加入环境变量
        value: "apinto-gateway-svc"
      - name: SVC_NAMESPACE #指定apinto服务所在命名空间
        value: "default"
      - name: APINTO_ADMIN_PORT
        value: "9400"
      - name: SVC_TOKEN  #将master节点的TOKEN加入环境变量
        value: "${TOKEN}"
```



#### 动态NFS卷（推荐）

我们推荐使用动态NFS卷进行远程目录挂载，理由如下：

* 可以通过创建PVC动态地创建对应PV，无需手动创建PV。
* 每创建一个PVC，都会在NFS服务器上的共享目录创建一个以 `${namespace}-${pvcName}-${pvName}`的命名格式的目录，无需手动在NFS服务器上创建多个目录。并且回收时会重命名为`archieved-${namespace}-${pvcName}-${pvName}` 的命名格式的目录。

备注：NFS Server要能与k8s集群内使用nfs卷的worker节点连通。



##### 创建nfs-client-provisioner POD

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nfs-client-provisioner
spec:
  replicas: 1
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: nfs-client-provisioner
  template:
    metadata:
      labels:
        app: nfs-client-provisioner
    spec:
      serviceAccountName: nfs-client-provisioner
      containers:
        - name: nfs-client-provisioner
          image: quay.io/external_storage/nfs-client-provisioner:latest
          volumeMounts:
            - name: nfs-client-root
              mountPath: /persistentvolumes
          env:
            - name: PROVISIONER_NAME
              value: apinto/nfs-client-provisioner  #PROVISIONER_NAME需要与下面StorageClass的provisioner保持一致
            - name: NFS_SERVER
              value: ${NFS_SERVER}   #NFS_SERVER的值需要与下面的NFS_SERVER保持一致
            - name: NFS_PATH
              value: /nfs/data/apinto   #NFS_PATH的值需要与厦门的path值保持一致
      volumes:
        - name: nfs-client-root
          nfs:
            server: ${NFS_SERVER} #NFS服务器IP
            path: /nfs/data/apinto    #NFS 共享目录
```



##### 创建StorageClass

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: managed-nfs-storage
provisioner: apinto/nfs-client-provisioner # or choose another name, must match deployment's env PROVISIONER_NAME'
reclaimPolicy: Delete  #回收策略
parameters:
  archiveOnDelete: "true" #回收时是否将要删除的目录重命名保存
```

**注意**：nfs的reclaimPolicy字段只支持Delete和Retain



##### 授权provisioner

若集群启用了RBAC，需要配置授权。

```yaml
kind: ServiceAccount
apiVersion: v1
metadata:
  name: nfs-client-provisioner
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: nfs-client-provisioner-runner
rules:
  - apiGroups: [""]
    resources: ["persistentvolumes"]
    verbs: ["get", "list", "watch", "create", "delete"]
  - apiGroups: [""]
    resources: ["persistentvolumeclaims"]
    verbs: ["get", "list", "watch", "update"]
  - apiGroups: ["storage.k8s.io"]
    resources: ["storageclasses"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["create", "update", "patch"]
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: run-nfs-client-provisioner
subjects:
  - kind: ServiceAccount
    name: nfs-client-provisioner
    namespace: default
roleRef:
  kind: ClusterRole
  name: nfs-client-provisioner-runner
  apiGroup: rbac.authorization.k8s.io
---
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: leader-locking-nfs-client-provisioner
rules:
  - apiGroups: [""]
    resources: ["endpoints"]
    verbs: ["get", "list", "watch", "create", "update", "patch"]
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: leader-locking-nfs-client-provisioner
subjects:
  - kind: ServiceAccount
    name: nfs-client-provisioner
    # replace with namespace where provisioner is deployed
    namespace: default
roleRef:
  kind: Role
  name: leader-locking-nfs-client-provisioner
  apiGroup: rbac.authorization.k8s.io
```



##### 创建PersistentVolumeClaim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-dynamic-claim
  annotations:
    volume.beta.kubernetes.io/storage-class: "managed-nfs-storage"
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 1Gi
```



##### 创建POD

yaml文件参考静态NFS的POD，不再赘述。

