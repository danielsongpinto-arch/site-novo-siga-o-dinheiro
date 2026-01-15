# Cloud Functions: Sincronização Firebase-Algolia

Este documento descreve como configurar Cloud Functions para sincronizar dados automaticamente entre Firebase Firestore e Algolia.

## 1. Por que usar Cloud Functions?

Sem Cloud Functions, você precisa sincronizar dados manualmente. Com Cloud Functions, os dados são sincronizados **automaticamente** quando:
- Um novo item é criado
- Um item é atualizado
- Um item é deletado

## 2. Pré-requisitos

- Firebase CLI instalado (`npm install -g firebase-tools`)
- Conta no Algolia
- Projeto Firebase já criado

## 3. Configurar Cloud Functions

### 3.1 Inicializar Cloud Functions no seu projeto

```bash
cd /home/ubuntu/siga-o-dinheiro-web
firebase init functions
```

Escolha as opções:
- Language: **TypeScript** (recomendado)
- ESLint: **Yes**

### 3.2 Instalar dependências do Algolia

```bash
cd functions
npm install algoliasearch
```

### 3.3 Criar função de sincronização

Edite o arquivo `functions/src/index.ts` e adicione:

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import algoliasearch from 'algoliasearch';

admin.initializeApp();

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_ADMIN_KEY || ''
);
const index = client.initIndex('siga-o-dinheiro');

// Sincronizar quando item é criado
export const onItemCreated = functions.firestore
  .document('items/{itemId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const objectID = snap.id;

    try {
      await index.saveObject({
        objectID,
        ...data,
      });
      console.log(`Item criado no Algolia: ${objectID}`);
    } catch (error) {
      console.error('Erro ao criar item no Algolia:', error);
    }
  });

// Sincronizar quando item é atualizado
export const onItemUpdated = functions.firestore
  .document('items/{itemId}')
  .onUpdate(async (change, context) => {
    const data = change.after.data();
    const objectID = change.after.id;

    try {
      await index.partialUpdateObject({
        objectID,
        ...data,
      });
      console.log(`Item atualizado no Algolia: ${objectID}`);
    } catch (error) {
      console.error('Erro ao atualizar item no Algolia:', error);
    }
  });

// Sincronizar quando item é deletado
export const onItemDeleted = functions.firestore
  .document('items/{itemId}')
  .onDelete(async (snap, context) => {
    const objectID = snap.id;

    try {
      await index.deleteObject(objectID);
      console.log(`Item deletado do Algolia: ${objectID}`);
    } catch (error) {
      console.error('Erro ao deletar item do Algolia:', error);
    }
  });
```

## 4. Configurar Variáveis de Ambiente

### 4.1 Obter Algolia Admin Key

1. Acesse [Algolia Dashboard](https://www.algolia.com/dashboard)
2. Vá para **Settings → API Keys**
3. Copie a **Admin API Key**

### 4.2 Adicionar variáveis ao Firebase

```bash
firebase functions:config:set algolia.app_id="YOUR_APP_ID"
firebase functions:config:set algolia.admin_key="YOUR_ADMIN_KEY"
```

Ou crie um arquivo `.env.local` na pasta `functions`:

```
ALGOLIA_APP_ID=your_app_id
ALGOLIA_ADMIN_KEY=your_admin_key
```

## 5. Deploy das Cloud Functions

### 5.1 Fazer login no Firebase

```bash
firebase login
```

### 5.2 Deploy

```bash
firebase deploy --only functions
```

Você verá um output como:

```
✔  Deploy complete!

Function URL (onItemCreated): https://us-central1-siga-o-dinheiro.cloudfunctions.net/onItemCreated
Function URL (onItemUpdated): https://us-central1-siga-o-dinheiro.cloudfunctions.net/onItemUpdated
Function URL (onItemDeleted): https://us-central1-siga-o-dinheiro.cloudfunctions.net/onItemDeleted
```

## 6. Testar a Sincronização

### 6.1 Criar um item via Admin Panel

1. Acesse `/admin` no seu projeto
2. Clique em **+ Novo Item**
3. Preencha os dados e clique em **Criar Item**

### 6.2 Verificar no Algolia

1. Acesse [Algolia Dashboard](https://www.algolia.com/dashboard)
2. Vá para **Indices → siga-o-dinheiro**
3. Você deve ver o novo item na lista

### 6.3 Verificar nos Logs do Firebase

```bash
firebase functions:log
```

Você deve ver logs como:

```
2024-01-15 12:34:56.789 onItemCreated Item criado no Algolia: abc123def456
```

## 7. Troubleshooting

### Erro: "Algolia Admin Key is invalid"
- Verifique se a Admin Key está correta
- Regenere a chave no Algolia Dashboard

### Erro: "Index not found"
- Certifique-se de que o índice foi criado no Algolia
- O nome do índice deve ser exatamente `siga-o-dinheiro`

### Função não é acionada
- Verifique se o documento está sendo criado em `items` collection
- Verifique os logs: `firebase functions:log`

## 8. Otimizações Futuras

1. **Batch Sync**: Sincronizar múltiplos itens em uma única chamada
2. **Error Handling**: Implementar retry logic para falhas de rede
3. **Monitoring**: Configurar alertas para falhas de sincronização
4. **Performance**: Usar Cloud Tasks para processar sincronizações em background

## 9. Referências

- [Firebase Cloud Functions Documentation](https://firebase.google.com/docs/functions)
- [Algolia API Reference](https://www.algolia.com/doc/api-reference/)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
