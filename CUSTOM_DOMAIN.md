# Configurar Domínio Customizado no Vercel

Este documento descreve como configurar um domínio customizado para seu projeto no Vercel.

## 1. Opções de Domínio

Você tem 3 opções:

| Opção | Descrição | Custo |
|-------|-----------|-------|
| **Domínio Vercel** | `seu-projeto.vercel.app` | Grátis |
| **Domínio Novo** | Comprar um novo domínio | $10-15/ano |
| **Domínio Existente** | Usar um domínio que você já possui | Grátis (apenas DNS) |

## 2. Usar Domínio Vercel (Padrão)

Seu projeto já tem um domínio Vercel padrão:

```
siga-o-dinheiro-web.vercel.app
```

Você pode acessar seu projeto em qualquer momento usando este domínio.

## 3. Comprar Novo Domínio no Vercel

### 3.1 Acessar Vercel Domains

1. Acesse seu projeto no Vercel
2. Vá para **Settings → Domains**
3. Clique em **Add Domain**

### 3.2 Pesquisar Domínio

1. Digite o domínio desejado (ex: `siga-o-dinheiro.com`)
2. Clique em **Search**
3. Se disponível, clique em **Buy**

### 3.3 Completar Compra

1. Preencha seus dados de pagamento
2. Clique em **Complete Purchase**
3. O domínio será registrado e configurado automaticamente

## 4. Usar Domínio Existente

Se você já possui um domínio, pode conectá-lo ao Vercel.

### 4.1 Adicionar Domínio no Vercel

1. Acesse seu projeto no Vercel
2. Vá para **Settings → Domains**
3. Clique em **Add Domain**
4. Digite seu domínio (ex: `siga-o-dinheiro.com`)
5. Clique em **Add**

### 4.2 Configurar DNS

Você verá instruções como:

```
Nameservers:
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

Ou registros A/CNAME:

```
A Record: 76.76.19.132
CNAME Record: cname.vercel-dns.com
```

### 4.3 Atualizar DNS no Provedor

1. Acesse o painel de controle do seu provedor de domínio (GoDaddy, Namecheap, etc.)
2. Vá para **DNS Settings** ou **Nameservers**
3. Substitua os nameservers atuais pelos do Vercel
4. Salve as mudanças

**Nota:** Pode levar até 24-48 horas para as mudanças de DNS se propagarem.

### 4.4 Verificar Propagação

Use uma ferramenta online para verificar se o DNS foi propagado:

- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://www.whatsmydns.net/)

## 5. Configurar Subdomínio

Você também pode usar subdomínios (ex: `app.siga-o-dinheiro.com`):

### 5.1 No Vercel

1. Vá para **Settings → Domains**
2. Clique em **Add Domain**
3. Digite o subdomínio (ex: `app.siga-o-dinheiro.com`)
4. Clique em **Add**

### 5.2 No Provedor de DNS

Crie um registro CNAME:

```
Name: app
Type: CNAME
Value: cname.vercel-dns.com
```

## 6. Configurar Certificado SSL/TLS

Vercel configura automaticamente certificados SSL/TLS gratuitos para seu domínio.

### 6.1 Verificar Status

1. Vá para **Settings → Domains**
2. Procure por "SSL/TLS Certificate"
3. Deve mostrar "Valid" ou "Provisioning"

### 6.2 Forçar HTTPS

1. Vá para **Settings → Security**
2. Ative **Force HTTPS**
3. Salve

## 7. Configurar Redirecionamento

Se você quer que `www.siga-o-dinheiro.com` redirecione para `siga-o-dinheiro.com`:

### 7.1 No Vercel

1. Vá para **Settings → Domains**
2. Adicione ambos os domínios
3. Clique no domínio `www.siga-o-dinheiro.com`
4. Em **Redirect to**, selecione `siga-o-dinheiro.com`

## 8. Troubleshooting

### Domínio não funciona após 24 horas

1. Verifique se o DNS foi propagado: [DNS Checker](https://dnschecker.org/)
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Tente em outro navegador ou dispositivo

### Certificado SSL não é válido

1. Aguarde até 24 horas para o certificado ser provisionado
2. Verifique se o domínio está apontando corretamente para Vercel
3. Contate suporte do Vercel se o problema persistir

### Erro 404 ao acessar domínio

1. Verifique se o domínio está configurado em **Settings → Domains**
2. Verifique se o projeto está deployado (deve haver um deployment recente)
3. Tente fazer um novo deploy: `git push origin main`

## 9. Próximos Passos

1. **Configurar email customizado** (ex: admin@siga-o-dinheiro.com)
2. **Adicionar registros SPF/DKIM** para melhorar entrega de emails
3. **Configurar Analytics** para monitorar tráfego do domínio
4. **Configurar Redirects** para URLs antigas

## 10. Referências

- [Vercel Domains Documentation](https://vercel.com/docs/concepts/projects/domains)
- [DNS Basics](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [SSL/TLS Certificates](https://vercel.com/docs/concepts/projects/domains#ssl-tls-certificates)
