# submarine-frontend

## 技術構成
- Next.js
- TypeScript
- Tailwind
- shadcn/ui

## Dockerを使用して起動

※先にルートディレクトリに.envファイルを作成する必要があります。
```bash
cp .env.example .env
```

```bash
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up -d
```

## Dockerを使わずに起動

nodeのバージョンは18.17.0以上を使用してください。

```bash
npm install
npm run dev
```

