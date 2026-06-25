/**
 * MiSabores — Script principal
 */

const WHATSAPP_URL = 'https://wa.me/5511982745572';

/* --------------------------------------------
   Dados dos serviços
   -------------------------------------------- */

const servicos = [
  {
    icon: '🎉',
    title: 'Buffet para festas e eventos',
    desc: 'Cardápio completo e personalizado para aniversários, casamentos, confraternizações e eventos corporativos.',
    color: 'rosa',
    message: 'Olá! Gostaria de um orçamento de buffet para meu evento.'
  },
  {
    icon: '🍽️',
    title: 'Garçom',
    desc: 'Profissionais treinados para servir seus convidados com cordialidade, agilidade e apresentação impecável.',
    color: 'azul',
    message: 'Olá! Preciso de garçom para meu evento.'
  },
  {
    icon: '🔥',
    title: 'Churrasqueiro',
    desc: 'Especialistas em churrasco para deixar suas carnes no ponto certo e garantir um aroma irresistível.',
    color: 'laranja',
    message: 'Olá! Gostaria de contratar um churrasqueiro.'
  },
  {
    icon: '👨‍🍳',
    title: 'Cozinheiro',
    desc: 'Cozinheiros experientes para preparar pratos deliciosos e cuidar de toda a produção do seu evento.',
    color: 'verde',
    message: 'Olá! Preciso de um cozinheiro para meu evento.'
  }
];

/* --------------------------------------------
   Dados dos produtos
   -------------------------------------------- */

const produtos = {
  caldos: {
    label: 'Caldos',
    items: [
      {
        icon: '🥣',
        title: 'Caldo verde',
        desc: 'Tradicional caldo verde português, reconfortante e cheio de sabor, ideal para eventos em dias frios.',
        color: 'verde'
      },
      {
        icon: '🥣',
        title: 'Caldo de mandioquinha',
        desc: 'Cremoso e aromático, preparado com mandioquinha fresca e temperos selecionados.',
        color: 'verde'
      },
      {
        icon: '🥣',
        title: 'Caldo de kenga',
        desc: 'Receita especial da casa, com sabor marcante e textura encorpada que agrada a todos.',
        color: 'verde'
      }
    ]
  },
  doces: {
    label: 'Doces',
    items: [
      {
        icon: '🍰',
        title: 'Bolo de pote',
        desc: 'Bolos de pote artesanais em diversos sabores, perfeitos para lembrancinhas e sobremesas.',
        color: 'rosa'
      },
      {
        icon: '🍫',
        title: 'Brigadeiros comuns',
        desc: 'Brigadeiros clássicos feitos com chocolate de qualidade, macios e irresistíveis.',
        color: 'rosa'
      },
      {
        icon: '✨',
        title: 'Brigadeiros personalizados',
        desc: 'Brigadeiros decorados e personalizados para combinar com o tema do seu evento.',
        color: 'rosa'
      }
    ]
  },
  salgados: {
    label: 'Salgados',
    items: [
      {
        icon: '🥟',
        title: 'Mini coxinha',
        desc: 'Coxinhas crocantes por fora e recheadas com frango temperado, tamanho ideal para festas.',
        color: 'laranja'
      },
      {
        icon: '🥙',
        title: 'Esfirras',
        desc: 'Esfirras assadas com massa macia e recheios variados, sempre saindo quentinhas do forno.',
        color: 'laranja'
      },
      {
        icon: '🧁',
        title: 'Bolo salgado de pote',
        desc: 'Camadas de pão, recheios cremosos e cobertura saborosa, prático e elegante para servir.',
        color: 'laranja'
      },
      {
        icon: '🥧',
        title: 'Torta salgada',
        desc: 'Tortas salgadas generosas com recheios variados, perfeitas para coffee breaks e festas.',
        color: 'laranja'
      }
    ]
  }
};

/* --------------------------------------------
   Funções utilitárias
   -------------------------------------------- */

function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `${WHATSAPP_URL}?text=${encoded}`;
}

function createCard({ icon, title, desc, color, message }) {
  const card = document.createElement('article');
  card.className = `card card--${color} fade-in`;

  const linkMessage = message || `Olá! Tenho interesse em ${title}. Pode me passar mais informações?`;
  const waLink = buildWhatsAppLink(linkMessage);

  card.innerHTML = `
    <span class="card__icon" aria-hidden="true">${icon}</span>
    <h3 class="card__title">${title}</h3>
    <p class="card__desc">${desc}</p>
    <a href="${waLink}" class="card__link" target="_blank" rel="noopener noreferrer">
      Pedir informações →
    </a>
  `;

  return card;
}

/* --------------------------------------------
   Renderização
   -------------------------------------------- */

function renderServicos() {
  const grid = document.getElementById('servicosGrid');
  if (!grid) return;

  servicos.forEach((servico) => {
    grid.appendChild(createCard(servico));
  });
}

function renderProdutos(categoria = 'caldos') {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const categoriaData = produtos[categoria];
  if (!categoriaData) return;

  categoriaData.items.forEach((produto) => {
    grid.appendChild(createCard(produto));
  });

  observeFadeElements();
}

function renderTabs() {
  const tabsContainer = document.getElementById('produtosTabs');
  if (!tabsContainer) return;

  const categorias = Object.keys(produtos);

  categorias.forEach((key, index) => {
    const btn = document.createElement('button');
    btn.className = `tab-btn${index === 0 ? ' active' : ''}`;
    btn.textContent = produtos[key].label;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    btn.dataset.categoria = key;

    btn.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.tab-btn').forEach((tab) => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderProdutos(key);
    });

    tabsContainer.appendChild(btn);
  });
}

/* --------------------------------------------
   Menu mobile
   -------------------------------------------- */

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

/* --------------------------------------------
   Header scroll
   -------------------------------------------- */

function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* --------------------------------------------
   Navegação ativa
   -------------------------------------------- */

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------
   Animações de entrada
   -------------------------------------------- */

function observeFadeElements() {
  const elements = document.querySelectorAll('.fade-in:not(.visible)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------
   Ano no footer
   -------------------------------------------- */

function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------
   Monte seu Pedido — Catálogo e cálculos
   -------------------------------------------- */

const pedidoCatalog = [
  {
    id: 'churrasco',
    label: 'Churrasco',
    icon: '🔥',
    color: 'laranja',
    items: [
      { id: 'carne-simples', name: 'Carne bovina simples', price: 55, unit: 'por_pessoa', unitLabel: 'por pessoa' },
      { id: 'carne-premium', name: 'Carne bovina premium', price: 85, unit: 'por_pessoa', unitLabel: 'por pessoa' },
      { id: 'linguica', name: 'Linguiça', price: 18, unit: 'por_pessoa', unitLabel: 'por pessoa' },
      { id: 'frango', name: 'Frango', price: 25, unit: 'por_pessoa', unitLabel: 'por pessoa' },
      { id: 'pao-alho', name: 'Pão de alho', price: 8, unit: 'por_pessoa', unitLabel: 'por pessoa' },
      { id: 'queijo-coalho', name: 'Queijo coalho', price: 12, unit: 'por_pessoa', unitLabel: 'por pessoa' }
    ]
  },
  {
    id: 'bebidas',
    label: 'Bebidas',
    icon: '🥤',
    color: 'azul',
    items: [
      { id: 'refrigerante', name: 'Refrigerante', price: 9, unit: 'por_pessoa', unitLabel: 'por pessoa' },
      { id: 'suco-natural', name: 'Suco natural', price: 12, unit: 'por_pessoa', unitLabel: 'por pessoa' },
      { id: 'agua', name: 'Água', price: 5, unit: 'por_pessoa', unitLabel: 'por pessoa' }
    ]
  },
  {
    id: 'doces',
    label: 'Doces',
    icon: '🍰',
    color: 'rosa',
    items: [
      { id: 'brigadeiro-comum', name: 'Brigadeiro comum', price: 2.5, unit: 'unidade', unitLabel: 'unidade' },
      { id: 'brigadeiro-personalizado', name: 'Brigadeiro personalizado', price: 4, unit: 'unidade', unitLabel: 'unidade' },
      { id: 'bolo-pote', name: 'Bolo de pote', price: 9, unit: 'unidade', unitLabel: 'unidade' }
    ]
  },
  {
    id: 'salgados',
    label: 'Salgados',
    icon: '🥟',
    color: 'laranja',
    items: [
      { id: 'mini-coxinha', name: 'Mini coxinha', price: 1.8, unit: 'unidade', unitLabel: 'unidade' },
      { id: 'esfirra', name: 'Esfirra', price: 2.5, unit: 'unidade', unitLabel: 'unidade' },
      { id: 'bolo-salgado-pote', name: 'Bolo salgado de pote', price: 12, unit: 'unidade', unitLabel: 'unidade' },
      { id: 'torta-salgada', name: 'Torta salgada', price: 65, unit: 'unidade', unitLabel: 'unidade' }
    ]
  },
  {
    id: 'servicos',
    label: 'Serviços adicionais',
    icon: '👨‍🍳',
    color: 'verde',
    items: [
      { id: 'churrasqueiro', name: 'Churrasqueiro', price: 350, unit: 'evento', unitLabel: 'por evento' },
      { id: 'cozinheiro', name: 'Cozinheiro', price: 300, unit: 'evento', unitLabel: 'por evento' },
      { id: 'garcom', name: 'Garçom', price: 220, unit: 'profissional', unitLabel: 'por profissional' },
      { id: 'auxiliar-cozinha', name: 'Auxiliar de cozinha', price: 180, unit: 'profissional', unitLabel: 'por profissional' }
    ]
  }
];

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getTotalPessoas() {
  const adultos = parseInt(document.getElementById('qtdAdultos')?.value, 10) || 0;
  const criancas = parseInt(document.getElementById('qtdCriancas')?.value, 10) || 0;
  return adultos + criancas;
}

function calcularItemSubtotal(item, checked, qty, totalPessoas) {
  if (!checked) return 0;

  switch (item.unit) {
    case 'por_pessoa':
      return item.price * totalPessoas;
    case 'unidade':
    case 'profissional':
      return item.price * Math.max(qty, 0);
    case 'evento':
      return item.price;
    default:
      return 0;
  }
}

function getItemQtyLabel(item, qty, totalPessoas) {
  if (!item) return '';

  switch (item.unit) {
    case 'por_pessoa':
      return `${totalPessoas} pessoa(s)`;
    case 'unidade':
      return `${qty} un.`;
    case 'profissional':
      return `${qty} profissional(is)`;
    case 'evento':
      return '1 evento';
    default:
      return '';
  }
}

function renderPedidoCategorias() {
  const container = document.getElementById('pedidoCategorias');
  if (!container) return;

  container.innerHTML = '';

  pedidoCatalog.forEach((categoria) => {
    const block = document.createElement('div');
    block.className = `pedido-categoria pedido-categoria--${categoria.color}`;
    block.dataset.categoria = categoria.id;

    const itensHtml = categoria.items.map((item) => {
      const needsQty = item.unit === 'unidade' || item.unit === 'profissional';
      const qtyHidden = !needsQty;

      return `
        <div class="pedido-item" data-item-id="${item.id}">
          <div class="pedido-item__check-wrap">
            <input type="checkbox" class="pedido-item__check" id="item-${item.id}"
              data-categoria="${categoria.id}" data-item="${item.id}" aria-label="Selecionar ${item.name}">
          </div>
          <div class="pedido-item__info">
            <div class="pedido-item__nome">${item.name}</div>
            <div class="pedido-item__preco">${formatCurrency(item.price)} ${item.unitLabel}</div>
          </div>
          <div class="pedido-item__qty-wrap${qtyHidden ? ' is-hidden' : ''}">
            <span class="pedido-item__qty-label">Qtd.</span>
            <input type="number" class="pedido-item__qty" id="qty-${item.id}"
              min="1" value="1" ${qtyHidden ? 'disabled tabindex="-1"' : ''}
              aria-label="Quantidade de ${item.name}">
          </div>
          <div class="pedido-item__subtotal" data-subtotal-item="${item.id}">${formatCurrency(0)}</div>
        </div>
      `;
    }).join('');

    block.innerHTML = `
      <div class="pedido-categoria__header">
        <h3 class="pedido-categoria__title">
          <span class="pedido-categoria__icon" aria-hidden="true">${categoria.icon}</span>
          ${categoria.label}
        </h3>
        <span class="pedido-categoria__subtotal" data-subtotal-cat="${categoria.id}">${formatCurrency(0)}</span>
      </div>
      <div class="pedido-categoria__itens">${itensHtml}</div>
    `;

    container.appendChild(block);
  });
}

function findCatalogItem(categoriaId, itemId) {
  const categoria = pedidoCatalog.find((c) => c.id === categoriaId);
  return categoria?.items.find((i) => i.id === itemId) || null;
}

function atualizarPedido() {
  const totalPessoas = getTotalPessoas();
  const resumoItens = [];
  const subtotaisPorCategoria = {};
  let totalGeral = 0;

  pedidoCatalog.forEach((categoria) => {
    subtotaisPorCategoria[categoria.id] = { label: categoria.label, total: 0 };
  });

  document.querySelectorAll('.pedido-item__check').forEach((checkbox) => {
    const categoriaId = checkbox.dataset.categoria;
    const itemId = checkbox.dataset.item;
    const item = findCatalogItem(categoriaId, itemId);
    if (!item) return;

    const qtyInput = document.getElementById(`qty-${itemId}`);
    const qty = parseInt(qtyInput?.value, 10) || 0;
    const subtotal = calcularItemSubtotal(item, checkbox.checked, qty, totalPessoas);

    const subtotalEl = document.querySelector(`[data-subtotal-item="${itemId}"]`);
    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);

    if (checkbox.checked && subtotal > 0) {
      subtotaisPorCategoria[categoriaId].total += subtotal;
      totalGeral += subtotal;
      resumoItens.push({
        name: item.name,
        detail: getItemQtyLabel(item, qty, totalPessoas),
        value: subtotal
      });
    }
  });

  pedidoCatalog.forEach((categoria) => {
    const catEl = document.querySelector(`[data-subtotal-cat="${categoria.id}"]`);
    if (catEl) catEl.textContent = formatCurrency(subtotaisPorCategoria[categoria.id].total);
  });

  const pessoasEl = document.getElementById('resumoPessoas');
  const totalEl = document.getElementById('resumoTotal');
  const totalMobileEl = document.getElementById('resumoTotalMobile');
  const itensEl = document.getElementById('resumoItens');
  const subtotaisEl = document.getElementById('resumoSubtotais');

  if (pessoasEl) pessoasEl.textContent = totalPessoas;
  if (totalEl) totalEl.textContent = formatCurrency(totalGeral);
  if (totalMobileEl) totalMobileEl.textContent = formatCurrency(totalGeral);

  if (itensEl) {
    if (resumoItens.length === 0) {
      itensEl.innerHTML = '<p class="pedido__resumo-vazio">Nenhum item selecionado ainda.</p>';
    } else {
      itensEl.innerHTML = resumoItens.map((item) => `
        <div class="pedido__resumo-item">
          <span class="pedido__resumo-item-nome">${item.name} <small>(${item.detail})</small></span>
          <span class="pedido__resumo-item-valor">${formatCurrency(item.value)}</span>
        </div>
      `).join('');
    }
  }

  if (subtotaisEl) {
    const catsComValor = Object.entries(subtotaisPorCategoria).filter(([, data]) => data.total > 0);
    if (catsComValor.length === 0) {
      subtotaisEl.innerHTML = '';
    } else {
      subtotaisEl.innerHTML = catsComValor.map(([, data]) => `
        <div class="pedido__resumo-cat">
          <span>${data.label}</span>
          <strong>${formatCurrency(data.total)}</strong>
        </div>
      `).join('');
    }
  }

  return { totalPessoas, totalGeral, resumoItens, subtotaisPorCategoria };
}

function formatarDataBr(dataIso) {
  if (!dataIso) return 'Não informada';
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function montarMensagemWhatsApp() {
  const nome = document.getElementById('clienteNome')?.value.trim() || 'Não informado';
  const whatsapp = document.getElementById('clienteWhatsapp')?.value.trim() || 'Não informado';
  const tipoEvento = document.getElementById('tipoEvento')?.value || 'Não informado';
  const data = formatarDataBr(document.getElementById('dataEvento')?.value);
  const local = document.getElementById('localEvento')?.value.trim() || 'Não informado';
  const adultos = parseInt(document.getElementById('qtdAdultos')?.value, 10) || 0;
  const criancas = parseInt(document.getElementById('qtdCriancas')?.value, 10) || 0;

  const { totalGeral, resumoItens, subtotaisPorCategoria } = atualizarPedido();

  let mensagem = `*Pedido MiSabores — Simulação de Buffet*\n\n`;
  mensagem += `*Nome do cliente:* ${nome}\n`;
  mensagem += `*WhatsApp:* ${whatsapp}\n`;
  mensagem += `*Tipo de evento:* ${tipoEvento}\n`;
  mensagem += `*Data prevista:* ${data}\n`;
  mensagem += `*Local do evento:* ${local}\n`;
  mensagem += `*Adultos:* ${adultos}\n`;
  mensagem += `*Crianças:* ${criancas}\n\n`;

  if (resumoItens.length > 0) {
    mensagem += `*Itens selecionados:*\n`;
    resumoItens.forEach((item) => {
      mensagem += `• ${item.name} (${item.detail}) — ${formatCurrency(item.value)}\n`;
    });
    mensagem += `\n*Subtotais por categoria:*\n`;
    Object.values(subtotaisPorCategoria).forEach((cat) => {
      if (cat.total > 0) {
        mensagem += `• ${cat.label}: ${formatCurrency(cat.total)}\n`;
      }
    });
  } else {
    mensagem += `*Itens selecionados:* Nenhum item selecionado\n\n`;
  }

  mensagem += `\n*Valor total estimado:* ${formatCurrency(totalGeral)}\n\n`;
  mensagem += `_Este valor é uma estimativa inicial e pode ser ajustado após avaliação da MiSabores._`;

  return mensagem;
}

function enviarPedidoWhatsApp() {
  const nome = document.getElementById('clienteNome')?.value.trim();
  if (!nome) {
    document.getElementById('clienteNome')?.focus();
    alert('Por favor, informe seu nome antes de enviar o pedido.');
    return;
  }

  const mensagem = montarMensagemWhatsApp();
  window.open(buildWhatsAppLink(mensagem), '_blank', 'noopener,noreferrer');
}

function initPedidoEvents() {
  const form = document.getElementById('pedidoForm');
  if (!form) return;

  const camposEvento = ['qtdAdultos', 'qtdCriancas', 'clienteNome', 'clienteWhatsapp', 'tipoEvento', 'dataEvento', 'localEvento'];
  camposEvento.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', atualizarPedido);
    if (el && el.tagName === 'SELECT') el.addEventListener('change', atualizarPedido);
  });

  form.addEventListener('change', (e) => {
    const target = e.target;
    if (target.classList.contains('pedido-item__check')) {
      atualizarPedido();
    }
  });

  form.addEventListener('input', (e) => {
    if (e.target.classList.contains('pedido-item__qty')) {
      atualizarPedido();
    }
  });

  document.getElementById('btnEnviarPedido')?.addEventListener('click', enviarPedidoWhatsApp);
  document.getElementById('btnEnviarPedidoMobile')?.addEventListener('click', enviarPedidoWhatsApp);

  const pedidoSection = document.getElementById('monte-seu-pedido');
  if (pedidoSection) {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        pedidoSection.classList.toggle('in-view', entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    sectionObserver.observe(pedidoSection);
  }

  atualizarPedido();
}

function initPedido() {
  renderPedidoCategorias();
  initPedidoEvents();
}

/* --------------------------------------------
   Inicialização
   -------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  renderServicos();
  renderTabs();
  renderProdutos('caldos');
  initPedido();
  initMobileNav();
  initHeaderScroll();
  initActiveNav();
  observeFadeElements();
  setCurrentYear();
});
