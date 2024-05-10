# ERC20 トークンを操作するサンプル

# Requirements

- Docker環境


## How to build
1. .envファイルの作成

    `web/.env`に以下ファイルを{}部分を置き換えて作成
    ```env
    VITE_WALLET_CONNECT_PROJECT_ID={ Wallet Connect Project ID }
    VITE_CONTRACT_ADDRESS={ YOUR Contract Address }
    VITE_DEFAULT_TO_ADDRESS={ 初期宛先アドレス }
    ```

1. コンテナイメージのビルド

    ```sh
    docker build -t token-web-sample ./
    ```

1. イメージの実行
    ```sh
    docker run -p 80:80 token-web-sample
    ```

1. ブラウザから http://localhost/ へ接続

