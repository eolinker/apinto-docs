# 部署
Apinto 完全基于 Golang 开发，不基于现有第三方产品，因此具有外部依赖少，部署简单等特点。

各位可以通过以下方式进行部署：

## 下载官方提供的安装包安装（推荐）

1.下载安装包并解压

```shell
wget https://github.com/eolinker/apinto/releases/download/v0.13.3/apinto_v0.13.3_linux_amd64.tar.gz && tar -zxvf apinto_v0.13.3_linux_amd64.tar.gz && cd apinto
```

Apinto支持在arm64、amd64架构上运行。

请根据需要下载对应架构及系统的安装包，安装包下载请[点击](https://github.com/eolinker/apinto/releases)跳转

2.安装网关：
```shell
./install.sh install
```
执行该步骤将会生成配置文件`/etc/apinto/apinto.yml`和`/etc/apinto/config.yml`，可根据需要修改。

3.启动
```shell
apinto start
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

**备注**：`/etc/apinto`目录不挂载的话将会使用默认配置文件，默认admin端口为9400，http端口为8099。

### 新建命名空间 
本文档部署将演示部署在命名空间`apinto`中，为此，需要先新建命名空间。

文件名：`namespace.yml`
```yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: apinto
```

命令行部署
```yaml
kubectl apply -f namespace.yml
```

### 创建ClusterRole
该角色具有所有资源的 **get、list、watch**，若系统已经自带角色，该步骤可忽略。

文件名：`apinto-cluster-role.yml`
```yaml
---
aggregationRule:
  clusterRoleSelectors:
    - matchLabels:
        rbac.authorization.k8s.io/aggregate-to-view: 'true'
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: 'true'
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
    rbac.authorization.k8s.io/aggregate-to-edit: 'true'
  name: view
rules:
  - apiGroups:
      - ''
    resources:
      - configmaps
      - endpoints
      - persistentvolumeclaims
      - persistentvolumeclaims/status
      - pods
      - replicationcontrollers
      - replicationcontrollers/scale
      - serviceaccounts
      - services
      - services/status
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - ''
    resources:
      - bindings
      - events
      - limitranges
      - namespaces/status
      - pods/log
      - pods/status
      - replicationcontrollers/status
      - resourcequotas
      - resourcequotas/status
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - ''
    resources:
      - namespaces
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - apps
    resources:
      - controllerrevisions
      - daemonsets
      - daemonsets/status
      - deployments
      - deployments/scale
      - deployments/status
      - replicasets
      - replicasets/scale
      - replicasets/status
      - statefulsets
      - statefulsets/scale
      - statefulsets/status
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - autoscaling
    resources:
      - horizontalpodautoscalers
      - horizontalpodautoscalers/status
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - batch
    resources:
      - cronjobs
      - cronjobs/status
      - jobs
      - jobs/status
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - extensions
    resources:
      - daemonsets
      - daemonsets/status
      - deployments
      - deployments/scale
      - deployments/status
      - ingresses
      - ingresses/status
      - networkpolicies
      - replicasets
      - replicasets/scale
      - replicasets/status
      - replicationcontrollers/scale
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - policy
    resources:
      - poddisruptionbudgets
      - poddisruptionbudgets/status
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - networking.k8s.io
    resources:
      - ingresses
      - ingresses/status
      - networkpolicies
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - metrics.k8s.io
    resources:
      - pods
      - nodes
    verbs:
      - get
      - list
      - watch
  - apiGroups:
      - tekton.dev
    resources:
      - tasks
      - taskruns
      - pipelines
      - pipelineruns
      - pipelineresources
      - conditions
    verbs:
      - get
      - list
      - watch
```

命令行部署
```shell
kubectl apply -f apinto-cluster-role.yml
```

### 创建Service Account
文件名：`apinto-service-account.yml`

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: apinto
  namespace: apinto

---
apiVersion: v1
kind: Secret
metadata:
  annotations:
    kubernetes.io/service-account.name: apinto
  name: apinto-token
  namespace: apinto
type: kubernetes.io/service-account-token

---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: role-bind-apinto
  namespace: apinto
subjects:
  - kind: ServiceAccount
    name: apinto
    namespace: apinto
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io
```

命令行部署
```shell
kubectl apply -f apinto-service-account.yml
```

### 创建网关节点
文件名：`apinto-gateway.yml`
```yaml
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  annotations: {}
  labels:
    k8s.kuboard.cn/name: apinto-gateway-stateful
  name: apinto-gateway-stateful
  namespace: apinto
spec:
  replicas: 3
  revisionHistoryLimit: 3
  selector:
    matchLabels:
      k8s.kuboard.cn/name: apinto-gateway-stateful
  serviceName: apinto-gateway-stateful
  template:
    metadata:
      labels:
        k8s.kuboard.cn/name: apinto-gateway-stateful
    spec:
      containers:
        - env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  apiVersion: v1
                  fieldPath: status.podIP
            - name: SVC_NAME
              value: apinto-gateway-stateful
            - name: SVC_NAMESPACE
              valueFrom:
                fieldRef:
                  apiVersion: v1
                  fieldPath: metadata.namespace
            - name: APINTO_ADMIN_PORT
              value: '9401'
            - name: SVC_TOKEN
              valueFrom:
                secretKeyRef:
                  key: token
                  name: apinto-token
          image: 'eolinker/apinto-gateway'
          imagePullPolicy: Always
          lifecycle:
            postStart:
              exec:
                command:
                  - /bin/bash
                  - '-c'
                  - nohup bash /apinto/join.sh >nohup.out 2>&1 &
            preStop:
              exec:
                command:
                  - /bin/bash
                  - '-c'
                  - bash /apinto/leave.sh
          name: apinto-gateway-stateful
          volumeMounts:
            - mountPath: /var/lib/apinto
              name: apinto-gateway-app
              subPath: data/
            - mountPath: /var/log/apinto
              name: apinto-gateway-app
              subPath: log/
      restartPolicy: Always
  volumeClaimTemplates:
  - apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      annotations:
        k8s.kuboard.cn/pvcType: Dynamic
      name: apinto-gateway-app
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 5G
      storageClassName: {storageClassName}
      volumeMode: Filesystem

---
apiVersion: v1
kind: Service
metadata:
  annotations: {}
  labels:
    k8s.kuboard.cn/name: apinto-gateway-stateful
  name: apinto-gateway-stateful
  namespace: apinto
spec:
  ports:
    - name: http
      nodePort: 31189
      port: 8099
      protocol: TCP
      targetPort: 8099
    - name: admin
      nodePort: 31194
      port: 9400
      protocol: TCP
      targetPort: 9400
    - name: cluster
      nodePort: 31191
      port: 9401
      protocol: TCP
      targetPort: 9401
  type: NodePort
  selector:
    k8s.kuboard.cn/name: apinto-gateway-stateful

```

上述文件中使用{}包裹的均为变量，在实际编辑时需要将其替换成具体的值，变量描述如下

* storageClassName：StorageClass资源名称

命令行部署
```shell
kubectl apply -f apinto-gateway.yml
```
