# ERC20 トークンを操作するサンプル

# Requirements

- Docker環境


## How to build
1. コンテナイメージのビルド

```sh
docker build -t token-web-sample ./
```

2. イメージの実行
```sh
docker run -p 80:80 token-web-sample
```
3. ブラウザから http://localhost/ へ接続
