import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  // Menfe brand (dark navy, institutional)
  navy: "#0A1628", navyM: "#12223F", navyL: "#1E3A5F",
  blue: "#1E4E9C", blueM: "#2563EB", blueL: "#DBEAFE",
  gold: "#C9A84C", goldL: "#FDF3DC",
  // Collegiate brand (warm, lifestyle)
  coll: "#E85D26", collD: "#C44A18", collL: "#FEF0EB",
  collBeige: "#F5F0E8", collDark: "#1A1208",
  // Shared
  white: "#FFFFFF", offwhite: "#F8F7F4",
  gray50: "#F9FAFB", gray100: "#F3F4F6", gray200: "#E5E7EB",
  gray400: "#9CA3AF", gray600: "#4B5563", gray800: "#1F2937",
  green: "#059669", greenL: "#D1FAE5",
  red: "#DC2626", redL: "#FEE2E2",
  amber: "#D97706", amberL: "#FEF3C7",
  border: "rgba(0,0,0,0.07)", borderLight: "rgba(255,255,255,0.1)",
};

const card = (e = {}) => ({
  backgroundColor: C.white, border: `0.5px solid ${C.border}`,
  borderRadius: 14, ...e,
});

const pill = (bg, color, e = {}) => ({
  fontSize: 10, padding: "3px 8px", borderRadius: 20,
  backgroundColor: bg, color, fontWeight: 600,
  whiteSpace: "nowrap", display: "inline-block", ...e,
});

const lbl = {
  fontSize: 10, color: C.gray400, textTransform: "uppercase",
  letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4,
};

function ST({ children, light }) {
  return (
    <div style={{
      fontSize: 10.5, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.08em", marginBottom: 12,
      color: light ? "rgba(255,255,255,0.5)" : C.gray400,
    }}>{children}</div>
  );
}

function Badge({ a, bg, color, size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(size * 0.28),
      background: bg, color, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: size * 0.35, fontWeight: 700, flexShrink: 0,
    }}>{a}</div>
  );
}

// ─── Sidebar Nav ─────────────────────────────────────────────────────────────
const NAV = [
  { section: "VISÃO GERAL", items: [
    { key: "overview", label: "Visão Geral do Projeto" },
  ]},
  { section: "FASE 1 — M1 a M4", items: [
    { key: "f1_arch",          label: "Arquitetura" },
    { key: "f1_roadmap",       label: "Roadmap" },
    { key: "f1_team",          label: "Equipe" },
    { key: "proto_menfe",      label: "Protótipo Menfe" },
    { key: "proto_backoffice", label: "Backoffice" },
  ]},
  { section: "FASE 2 — M5 a M8", items: [
    { key: "f2_arch",          label: "Arquitetura" },
    { key: "f2_roadmap",       label: "Roadmap" },
    { key: "f2_team",          label: "Equipe" },
    { key: "proto_collegiate", label: "Protótipo" },
  ]},
  { section: "FASE 3 — M9 a M12", items: [
    { key: "f3_arch",          label: "Arquitetura" },
    { key: "f3_roadmap",       label: "Roadmap" },
    { key: "f3_team",          label: "Equipe" },
    { key: "proto_leads",      label: "Protótipo" },
  ]},
];

const PAGE_LABELS = {
  overview:          "Visão Geral do Projeto",
  f1_arch:           "Fase 1 · Arquitetura",
  f1_roadmap:        "Fase 1 · Roadmap",
  f1_team:           "Fase 1 · Equipe",
  proto_menfe:       "Fase 1 · Protótipo App do Investidor",
  proto_backoffice:  "Fase 1 · Protótipo Backoffice",
  f2_arch:           "Fase 2 · Arquitetura",
  f2_roadmap:        "Fase 2 · Roadmap",
  f2_team:           "Fase 2 · Equipe",
  proto_collegiate:  "Fase 2 · Protótipo App do Inquilino",
  f3_arch:           "Fase 3 · Arquitetura",
  f3_roadmap:        "Fase 3 · Roadmap",
  f3_team:           "Fase 3 · Equipe",
  proto_leads:       "Fase 3 · Protótipo App de Leads",
};

function Sidebar({ active, setActive }) {
  return (
    <aside style={{
      width: 210, minWidth: 210, backgroundColor: C.navy,
      borderRight: `0.5px solid rgba(255,255,255,0.06)`,
      display: "flex", flexDirection: "column", overflowY: "auto",
    }}>
      {/* Logo */}
      <div style={{
        padding: "16px 18px", borderBottom: `0.5px solid rgba(255,255,255,0.07)`,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: `linear-gradient(135deg, ${C.blue}, ${C.blueM})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px",
        }}>M</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.white, letterSpacing: "-0.2px" }}>menfe</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Dashboard MVP</div>
        </div>
      </div>

      {NAV.map(({ section, items }) => (
        <div key={section}>
          <div style={{
            padding: "14px 14px 5px", fontSize: 9.5, fontWeight: 700,
            color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase",
          }}>{section}</div>
          {items.map(({ key, label: lbl_ }) => (
            <div key={key} onClick={() => setActive(key)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "7px 14px",
              borderRadius: 7, margin: "1px 8px", cursor: "pointer",
              color: active === key ? C.white : "rgba(255,255,255,0.45)",
              fontWeight: active === key ? 600 : 400, fontSize: 12.5,
              backgroundColor: active === key ? "rgba(255,255,255,0.1)" : "transparent",
              transition: "all 0.12s",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", flexShrink: 0, display: "inline-block",
                backgroundColor: active === key
                  ? (key.startsWith("proto_menfe") || key.startsWith("f1") ? C.gold : key.startsWith("proto_collegiate") || key.startsWith("f2") ? C.coll : key.startsWith("proto_backoffice") ? "#7C3AED" : key.startsWith("proto_leads") || key.startsWith("f3") ? "#2D7D46" : C.blueM)
                  : "rgba(255,255,255,0.15)",
              }} />
              {lbl_}
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: "auto", padding: 12, borderTop: `0.5px solid rgba(255,255,255,0.07)` }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
          backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 9,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `linear-gradient(135deg, ${C.blue}, ${C.blueM})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#fff",
          }}>M</div>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: C.white }}>menfe</div>
            <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)" }}>Produto Digital · v11</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ active }) {
  return (
    <div style={{
      padding: "11px 26px", borderBottom: `0.5px solid ${C.border}`,
      backgroundColor: C.white, display: "flex", alignItems: "center",
      gap: 6, fontSize: 12, color: C.gray400, flexShrink: 0,
    }}>
      <span style={{ color: C.gray800, fontWeight: 600 }}>{PAGE_LABELS[active]}</span>
      <span style={{ color: "#ddd" }}>/</span>
      <span>Menfe · Documentação de Produto</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: OVERVIEW — Visão Geral do Projeto
// ═══════════════════════════════════════════════════════════════════════════════
function PageOverview() {
  const [activePhase, setActivePhase] = useState(null);

  const PHASES = [
    {
      id: "F1", label: "Fase 1", range: "M1 – M4", color: "#1A2445", colorL: "#EEF0FC",
      title: "MVP · App do Investidor + Backoffice",
      icon: "📱",
      objetivo: "Lançar o produto central da Menfe: o app que permite ao investidor acompanhar seu portfólio, contratos, evolução de obras e aportes — com o backoffice administrativo para gestão interna.",
      publico: "Investidores da Menfe e equipe administrativa interna.",
      entregaveis: [
        "App Menfe (React Native · iOS & Android)",
        "Backoffice Admin (NextJS · Web)",
        "Backend NestJS + PostgreSQL (módulos de F1)",
      ],
      funcionalidades: [
        "Autenticação segura (CPF/e-mail + senha)",
        "Dashboard: patrimônio, dividendos e aportes",
        "Portfólio de empreendimentos investidos",
        "Evolução de obra em tempo real",
        "Download de contratos PDF",
        "Hall de lançamentos com 'Quero Investir'",
        "Chat com a equipe Menfe",
        "Notificações push e log de atividades",
        "Backoffice: gestão de obras, contratos e financeiro",
      ],
      team: "3 devs full-time (160h/mês) + 1 designer part-time (80h/mês, M1–M2) + 1 GP (40h/mês)",
      estrategia: "Entregar o core da plataforma com o menor escopo viável para validar o produto com investidores reais. O backoffice é desenvolvido em paralelo para que a equipe Menfe possa operar desde o dia 1 sem dependências externas.",
    },
    {
      id: "F2", label: "Fase 2", range: "M5 – M8", color: "#C44A18", colorL: "#FEF0EB",
      title: "App do Inquilino · Área Logada",
      icon: "🏠",
      objetivo: "Expandir a plataforma para o segundo perfil de usuário: o hóspede do Collegiate. Criar a experiência digital de quem ocupa o imóvel — financeiro, serviços, reservas e comunicação com a gestão.",
      publico: "Hóspedes ativos dos empreendimentos Collegiate.",
      entregaveis: [
        "App Collegiate — área logada (React Native · iOS & Android)",
        "Expansão App Menfe F2 (mapas, investimentos, carrinho, chat)",
        "Backoffice F2 (gestão de hóspedes, quartos, serviços e reservas)",
        "Backend F2 (booking, carrinho, financeiro de hóspedes)",
      ],
      funcionalidades: [
        "Login e perfil do hóspede",
        "Financeiro: aluguel, histórico e segunda via de boleto/Pix",
        "Lista de quartos e serviços do empreendimento",
        "Carrinho e gestão de reservas",
        "Avisos, notificações do condomínio",
        "Expansão do App Menfe: mapas, gestão de investimentos e chat",
        "Backoffice: hóspedes, quartos, serviços e reservas",
      ],
      team: "3 devs full-time (160h/mês) + 1 designer part-time (80h/mês) + 1 GP (40h/mês)",
      estrategia: "Com o MVP validado na F1, a F2 expande o ecossistema para o lado do hóspede. O sistema de booking e financeiro é a base técnica que sustenta a monetização recorrente do Collegiate — pavimentando a visão de plataforma de moradia flexível. O designer trabalha em paralelo com o desenvolvimento, garantindo continuidade visual.",
    },
    {
      id: "F3", label: "Fase 3", range: "M9 – M12", color: "#2D7D46", colorL: "#E8F5EE",
      title: "App Collegiate F3 · Gestão Avançada",
      icon: "🔑",
      objetivo: "Completar a experiência do hóspede com funcionalidades avançadas de gestão do dia a dia: reserva de áreas comuns, controle de acesso por chave digital, agendamento de serviços e mapas do empreendimento. Esta fase consolida o Collegiate como uma plataforma de moradia — próxima ao modelo Airbnb/Quinto Andar.",
      publico: "Hóspedes ativos e equipe de gestão do Collegiate.",
      entregaveis: [
        "App Collegiate F3 — funcionalidades avançadas",
        "Backoffice F3 (gestão de áreas comuns)",
        "Backend F3 (quartos, reservas de áreas, acessos)",
      ],
      funcionalidades: [
        "Chat integrado no app",
        "Gestão de quartos (M9–M10)",
        "Reserva de áreas comuns e serviços",
        "Mapas do empreendimento",
        "Chave de acesso digital",
        "Agendamento de serviços",
        "Gestão de áreas comuns no Backoffice",
      ],
      team: "2 devs full-time (160h/mês · BE encerra M10) + 1 designer part-time (80h/mês) + 1 GP (40h/mês)",
      estrategia: "A F3 fecha o ciclo da experiência do hóspede, tornando o app o centro de controle da estadia no Collegiate. O foco em acesso digital e agendamento reduz a operação manual da gestão e posiciona o Collegiate como uma plataforma de moradia flexível e premium — com infraestrutura tecnológica para escalar no modelo de marketplace habitacional.",
    },
  ];

  const METRICS = [
    { label: "Fases", value: "3", sub: "F1 Investidor · F2 Inquilino · F3 Avançado", color: C.blue },
    { label: "Duração total", value: "12 m", sub: "M1 a M12 · 4 meses por fase", color: C.gold },
    { label: "Apps entregues", value: "3", sub: "App Menfe · App Collegiate · Backoffice", color: C.coll },
    { label: "Perfis de usuário", value: "3", sub: "Investidor · Inquilino · Admin", color: "#2D7D46" },
  ];

  const SISTEMAS = [
    { abbr:"API", nome:"Backend · NestJS + PostgreSQL", color:"#2D7D46", fases:"F1→F3", desc:"Serve todos os apps. Auth JWT + RBAC, financeiro, booking, chat, push e integrações bancárias." },
    { abbr:"F1",  nome:"App Menfe · React Native",       color:"#1A2445", fases:"F1→F2", desc:"App do investidor. Portfólio, obras, financeiro, contratos, lançamentos e chat." },
    { abbr:"BO",  nome:"Backoffice · NextJS Web",        color:"#7C3AED", fases:"F1→F3", desc:"Painel de gestão interna. Empreendimentos, obras, contratos, hóspedes e áreas comuns." },
    { abbr:"CO",  nome:"App Collegiate · React Native",  color:"#C44A18", fases:"F2→F3", desc:"App do hóspede. Financeiro, reservas, serviços, chat, acesso digital e mapas — com visão de plataforma de moradia flexível." },
  ];

  return (
    <div style={{ flex:1, overflowY:"auto", backgroundColor:C.offwhite }}>

      {/* Hero banner */}
      <div style={{
        background:`linear-gradient(135deg, ${C.navy} 0%, #0E1F3D 60%, #162A4A 100%)`,
        padding:"36px 40px 32px", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", background:"rgba(30,78,156,0.15)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-40, left:200, width:200, height:200, borderRadius:"50%", background:`rgba(201,168,76,0.08)`, pointerEvents:"none" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:44, height:44, borderRadius:13, background:`linear-gradient(135deg,${C.blue},${C.blueM})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900, color:"#fff" }}>M</div>
            <div style={{ width:44, height:44, borderRadius:13, background:`rgba(201,168,76,0.2)`, border:`1px solid rgba(201,168,76,0.4)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900, color:C.gold }}>C</div>
            <div style={{ width:1, height:32, backgroundColor:"rgba(255,255,255,0.12)", margin:"0 4px" }}/>
            <div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em" }}>Documentação de Produto</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", fontWeight:500 }}>Menfe · Collegiate · Plataforma Digital</div>
            </div>
          </div>
          <div style={{ fontSize:28, fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:10, letterSpacing:"-0.5px", maxWidth:640 }}>
            Plataforma completa para<br/><span style={{ color:C.gold }}>investidores e hóspedes</span> do Collegiate
          </div>
          <div style={{ fontSize:13.5, color:"rgba(255,255,255,0.55)", lineHeight:1.8, maxWidth:600 }}>
            Ecossistema digital em 3 fases que conecta a equipe Menfe, seus investidores e os hóspedes do Collegiate numa experiência unificada — do portfólio de obras ao acesso digital do imóvel.
          </div>
        </div>
      </div>

      <div style={{ padding:"28px 40px 48px", display:"flex", flexDirection:"column", gap:28 }}>

        {/* Metrics strip */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {METRICS.map(m => (
            <div key={m.label} style={{ ...card({ borderTop:`3px solid ${m.color}` }), padding:"16px 20px" }}>
              <div style={lbl}>{m.label}</div>
              <div style={{ fontSize:30, fontWeight:800, color:C.gray800, lineHeight:1, marginBottom:4 }}>{m.value}</div>
              <div style={{ fontSize:11, color:C.gray400, lineHeight:1.5 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* O Projeto */}
        <div style={{ ...card(), padding:"24px 28px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:14 }}>O Projeto</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:C.gray800, marginBottom:10 }}>Contexto e Visão</div>
              <div style={{ fontSize:13, color:C.gray600, lineHeight:1.9 }}>
                A <strong style={{ color:C.gray800 }}>Menfe</strong> é uma gestora de investimentos imobiliários focada em empreendimentos do segmento <strong style={{ color:C.gray800 }}>Collegiate</strong> — residências premium com serviços, locação por temporada e experiência de moradia de alto padrão. No futuro, o Collegiate se posiciona como uma plataforma de hospedagem e moradia flexível, com DNA próximo ao Airbnb e ao Quinto Andar. A plataforma digital cobre dois mundos: o do <strong style={{ color:C.navyL }}>investidor</strong>, que aporta capital e acompanha rentabilidade e evolução de obra, e o do <strong style={{ color:C.collD }}>hóspede</strong>, que ocupa o empreendimento e precisa de uma experiência digital de alto padrão no seu dia a dia.
              </div>
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:C.gray800, marginBottom:10 }}>Estratégia de Produto</div>
              <div style={{ fontSize:13, color:C.gray600, lineHeight:1.9 }}>
                O desenvolvimento é faseado para <strong style={{ color:C.gray800 }}>entregar valor desde o primeiro mês</strong> e validar com usuários reais antes de ampliar o escopo. A <strong style={{ color:"#1A2445" }}>Fase 1</strong> foca no investidor — o cliente central da Menfe. A <strong style={{ color:"#C44A18" }}>Fase 2</strong> expande para o hóspede com o core da experiência de ocupação. A <strong style={{ color:"#2D7D46" }}>Fase 3</strong> completa a jornada com funcionalidades avançadas de gestão e acesso ao imóvel.
              </div>
            </div>
          </div>
        </div>

        {/* Sistemas */}
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:14 }}>Ecossistema de Sistemas</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {SISTEMAS.map(s => (
              <div key={s.abbr} style={{ ...card({ borderTop:`3px solid ${s.color}` }), padding:"16px 18px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <div style={{ width:34, height:34, borderRadius:9, backgroundColor:s.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#fff", flexShrink:0 }}>{s.abbr}</div>
                  <div>
                    <div style={{ fontSize:12.5, fontWeight:700, color:C.gray800, lineHeight:1.3 }}>{s.nome}</div>
                    <div style={{ fontSize:10, color:s.color, fontWeight:600, marginTop:2 }}>{s.fases}</div>
                  </div>
                </div>
                <div style={{ fontSize:11.5, color:C.gray600, lineHeight:1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase cards */}
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:14 }}>Estratégia por Fase</div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {PHASES.map(ph => {
              const isOpen = activePhase === ph.id;
              return (
                <div key={ph.id} style={{ ...card({ border:`1px solid ${isOpen ? ph.color : C.border}`, boxShadow: isOpen ? `0 0 0 3px ${ph.color}18` : undefined }), overflow:"hidden", transition:"all 0.2s" }}>
                  {/* Header */}
                  <div onClick={() => setActivePhase(isOpen ? null : ph.id)} style={{ padding:"18px 24px", cursor:"pointer", display:"flex", alignItems:"center", gap:16, borderTop:`3px solid ${ph.color}` }}>
                    <div style={{ width:42, height:42, borderRadius:12, backgroundColor:ph.colorL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{ph.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:3 }}>
                        <span style={{ fontSize:11, fontWeight:700, color:ph.color, textTransform:"uppercase", letterSpacing:"0.09em" }}>{ph.label}</span>
                        <span style={{ fontSize:10, color:C.gray400, backgroundColor:C.gray100, borderRadius:20, padding:"2px 9px", fontWeight:600 }}>{ph.range}</span>
                      </div>
                      <div style={{ fontSize:15, fontWeight:700, color:C.gray800 }}>{ph.title}</div>
                    </div>
                    <div style={{ fontSize:11, color:C.gray400, fontWeight:600 }}>{isOpen ? "fechar ▲" : "expandir ▼"}</div>
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div style={{ borderTop:`0.5px solid ${C.border}`, padding:"22px 24px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:22 }}>
                      {/* Objetivo */}
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:ph.color, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Objetivo</div>
                        <div style={{ fontSize:12.5, color:C.gray600, lineHeight:1.8, marginBottom:14 }}>{ph.objetivo}</div>
                        <div style={{ fontSize:10, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Público-alvo</div>
                        <div style={{ fontSize:12, color:C.gray600 }}>{ph.publico}</div>
                        <div style={{ fontSize:10, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.08em", marginTop:12, marginBottom:6 }}>Time</div>
                        <div style={{ fontSize:12, color:C.gray600, lineHeight:1.6 }}>{ph.team}</div>
                      </div>
                      {/* Entregáveis */}
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:ph.color, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Entregáveis</div>
                        <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:18 }}>
                          {ph.entregaveis.map(e => (
                            <div key={e} style={{ display:"flex", gap:9, alignItems:"flex-start" }}>
                              <div style={{ width:18, height:18, borderRadius:5, backgroundColor:ph.colorL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                                <span style={{ fontSize:9, color:ph.color, fontWeight:800 }}>✓</span>
                              </div>
                              <span style={{ fontSize:12, color:C.gray700||C.gray800, lineHeight:1.5 }}>{e}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Funcionalidades + Estratégia */}
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:ph.color, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Funcionalidades-chave</div>
                        <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:18 }}>
                          {ph.funcionalidades.map(f => (
                            <div key={f} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                              <div style={{ width:4, height:4, borderRadius:"50%", backgroundColor:ph.color, flexShrink:0, marginTop:6 }}/>
                              <span style={{ fontSize:11.5, color:C.gray600, lineHeight:1.5 }}>{f}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ backgroundColor:ph.colorL, borderRadius:10, padding:"12px 14px", border:`1px solid ${ph.color}22` }}>
                          <div style={{ fontSize:10, fontWeight:700, color:ph.color, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>Estratégia</div>
                          <div style={{ fontSize:11.5, color:C.gray700||C.gray800, lineHeight:1.75 }}>{ph.estrategia}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline strip */}
        <div style={{ ...card(), padding:"20px 24px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:16 }}>Timeline Geral · 12 Meses</div>
          <div style={{ display:"flex", gap:0, position:"relative" }}>
            {[
              { label:"F1 · App Investidor + BO", color:"#1A2445", months:"M1–M4", w:"33.3%" },
              { label:"F2 · App Inquilino",        color:"#C44A18", months:"M5–M8", w:"33.3%" },
              { label:"F3 · App Avançado",          color:"#2D7D46", months:"M9–M12", w:"33.3%" },
            ].map((seg, i) => (
              <div key={seg.label} style={{ width:seg.w, padding:"12px 16px", backgroundColor:seg.color, borderRadius: i===0?"10px 0 0 10px":i===2?"0 10px 10px 0":"0", borderLeft:i>0?"1px solid rgba(255,255,255,0.2)":"none" }}>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{seg.months}</div>
                <div style={{ fontSize:12.5, fontWeight:700, color:"#fff" }}>{seg.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(12,1fr)", gap:0, marginTop:8 }}>
            {Array.from({length:12},(_,i)=>i+1).map(m => {
              const color = m<=4?"#1A2445":m<=8?"#C44A18":"#2D7D46";
              return (
                <div key={m} style={{ textAlign:"center", padding:"4px 0", borderLeft:m>1?`0.5px solid ${C.border}`:"none" }}>
                  <div style={{ fontSize:10, fontWeight:700, color }}> M{m}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════════
function SitemapNode({ sys, id, selected, onSelect }) {
  const isSel = selected === id;
  return (
    <div onClick={() => onSelect(isSel ? null : id)} style={{
      backgroundColor: C.white, border: `1px solid ${isSel ? sys.color : C.border}`,
      borderRadius: 12, padding: "13px 20px", cursor: "pointer",
      boxShadow: isSel ? `0 0 0 3px ${sys.color}22` : "0 1px 4px rgba(0,0,0,0.05)",
      transition: "all 0.15s", width: "100%", maxWidth: 400,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: sys.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{sys.abbr}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.gray800 }}>{sys.label}</div>
          <div style={{ fontSize: 11, color: C.gray400 }}>{sys.sub}</div>
        </div>
        {isSel && <span style={{ marginLeft: "auto", fontSize: 10, color: sys.color, fontWeight: 600 }}>▼ detalhes</span>}
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {sys.profiles.map(p => <span key={p} style={{ ...pill(`${sys.color}15`, sys.color), fontSize: 10 }}>{p}</span>)}
      </div>
    </div>
  );
}

function PageArchitecture({ phase = "F1" }) {
  const [selected, setSelected] = useState(null);
  const phaseColors = { F1:"#1A2445", F2:"#C44A18", F3:"#2D7D46" };
  const phColor = phaseColors[phase];

  const SYSTEMS = {
    backend: {
      abbr: "API", label: "Backend & API", sub: "NestJS · PostgreSQL · Firebase",
      color: "#2D7D46", colorL: "#E8F5EE",
      profiles: ["API REST", "Auth JWT", "Push FCM", "Gateway Pgto"],
      desc: "Backend unificado que serve os três apps e o backoffice. Autenticação por perfil (investidor/hóspede/admin), gestão financeira por fase, sistema de booking (F3), push notifications, integração bancária e CMS para conteúdo de obras.",
      screens: [
        { p: "Autenticação & Perfis", items: ["Login CPF/e-mail + senha", "FaceID / TouchID (investidor)", "3 perfis: Investidor · Inquilino · Admin", "JWT + refresh token", "RBAC por tipo de acesso"] },
        { p: "Dados & Integrações", items: ["ERP / gestão de contratos Menfe", "Gateway Pix, Boleto e cartão", "Firebase FCM (push)", "Galeria fotos S3/CDN", "CMS comunicados e atualizações de obra", "Webhook WhatsApp para leads (F1)"] },
      ],
    },
    menfe: {
      abbr: "F1", label: "App do Investidor · Fase 1", sub: "React Native · iOS & Android",
      color: C.navyL, colorL: C.blueL,
      profiles: ["Investidor", "iOS", "Android"],
      desc: "App do investidor Menfe — MVP da plataforma. Login, portfólio de imóveis, evolução de obras em tempo real, contratos PDF, histórico financeiro, hall de lançamentos com botão 'Quero Investir' redirecionando a WhatsApp, chat com a equipe e notificações push.",
      screens: [
        { p: "Autenticação & Home", items: ["Login com CPF/e-mail + senha + biometria", "Home com patrimônio total e variação %", "Ações rápidas: portfólio, financeiro, chat", "Atividade recente e avisos de vencimento"] },
        { p: "Portfólio & Obras", items: ["Lista de imóveis com VGV e status", "Detalhe do ativo com fotos", "Evolução de obra por etapas (%)", "Ring chart e progress bars por etapa", "Relatórios mensais de progresso"] },
        { p: "Financeiro & Contratos", items: ["Resumo financeiro e dividendos acumulados", "Histórico de aportes por mês", "Contratos e documentos PDF (download)", "Agenda de vencimentos e parcelas"] },
        { p: "Hall de Lançamentos", items: ["Lista de novos empreendimentos Collegiate", "Detalhes: localização, VGV, unidades, status", "Botão 'Quero Investir' → WhatsApp ou canal externo", "Badge de destaque para lançamentos em foco"] },
        { p: "Chat, Perfil & Histórico", items: ["Chat direto com equipe Menfe", "Log de atividades cronológico", "Notificações segmentadas por tipo", "Perfil, segurança e configurações"] },
      ],
    },
    collegiate: {
      abbr: "F2", label: "App do Inquilino · Fase 2", sub: "React Native · Área Logada",
      color: C.collD, colorL: C.collL,
      profiles: ["Inquilino", "iOS", "Android"],
      desc: "Área logada exclusiva para hóspedes do Collegiate. Três pilares: financeiro (aluguel, segunda via, histórico de pagamentos), manual digital do imóvel (docs, regras de uso, FAQ) e informações gerais do prédio (portaria, áreas comuns, chamados). Sem busca ou booking — isso é F3.",
      screens: [
        { p: "Home & Boas-vindas", items: ["Saudação personalizada ao hóspede", "Resumo do contrato e unidade ativa", "Avisos e comunicados do prédio", "Atalhos para financeiro e manual"] },
        { p: "Financeiro", items: ["Valor do aluguel e data de vencimento", "Histórico de pagamentos com comprovantes", "Segunda via de boleto / Pix", "Alertas de vencimento por push"] },
        { p: "Manual do Imóvel", items: ["Guia digital de uso do imóvel", "Regras do condomínio", "Procedimentos de check-in/out", "FAQ e contatos úteis"] },
        { p: "Informações do Prédio", items: ["Serviços disponíveis e horários", "Contato da portaria e gestão", "Abertura de chamados de manutenção", "Notificações do condomínio"] },
      ],
    },
    backoffice: {
      abbr: "BO", label: "Backoffice Administrativo · F1", sub: "NextJS · Web Admin",
      color: "#7C3AED", colorL: "#EDE9FE",
      profiles: ["Admin", "Gestor", "Web"],
      desc: "Painel de administração que acompanha a F1. Permite à equipe Menfe gerenciar investidores, empreendimentos, evolução de obra, contratos e financeiro. Dashboard com visão consolidada e controle de permissões por papel.",
      screens: [
        { p: "Gestão de Usuários", items: ["CRUD de investidores e hóspedes", "Controle de perfis e permissões (RBAC)", "Histórico de acessos e atividades", "Notificações para usuários específicos"] },
        { p: "Empreendimentos & Obras", items: ["Cadastro e edição de empreendimentos", "Atualização de progresso de obra (%)", "Upload de fotos e relatórios mensais", "Gestão de unidades disponíveis"] },
        { p: "Financeiro & Contratos", items: ["Registro de aportes e dividendos", "Geração e envio de contratos PDF", "Conciliação bancária (Pix/Boleto)", "Relatórios financeiros por investidor"] },
      ],
    },
    leads: {
      abbr: "F3", label: "App de Leads · Fase 3", sub: "React Native · Área Pública",
      color: "#2D7D46", colorL: "#E8F5EE",
      profiles: ["Lead", "Prospect", "iOS", "Android"],
      desc: "Área deslogada do app voltada para captação de leads e conversão. Vitrine pública de empreendimentos Collegiate com busca, filtros e detalhe. Funcionalidade de booking para reserva de unidades e fluxo de conversão de lead em hóspede.",
      screens: [
        { p: "Vitrine & Busca", items: ["Lista de empreendimentos disponíveis", "Busca por cidade, tipo e faixa de preço", "Filtros avançados e categorias", "Detalhe do empreendimento com galeria e mapa"] },
        { p: "Booking & Conversão", items: ["Seleção de unidade disponível", "Agendamento de visita ou reserva", "Fluxo de cadastro de lead", "CTA para falar com consultor"] },
      ],
    },
    collegiate_f3: {
      abbr: "F3+", label: "App do Inquilino · Fase 3 — Novas features", sub: "React Native · Expansão F2 → F3",
      color: "#B45309", colorL: "#FEF3C7",
      profiles: ["Hóspede", "iOS", "Android", "F2 → F3"],
      desc: "Expansão do App Collegiate entregue na Fase 2. A Fase 3 adiciona as funcionalidades avançadas de gestão do dia a dia: chat integrado, gestão completa de quartos, reserva de áreas comuns, mapas do empreendimento, chave de acesso digital e agendamento de serviços.",
      screens: [
        { p: "✦ Novo · Chat", items: ["Chat integrado com a gestão do empreendimento", "Mensagens diretas e comunicados do prédio", "Histórico de conversas", "Notificações de mensagens por push"] },
        { p: "✦ Novo · Gestão de Quartos", items: ["Detalhes completos do quarto ocupado", "Check-in e check-out digital", "Solicitação de troca de quarto", "Histórico de ocupação"] },
        { p: "✦ Novo · Áreas Comuns", items: ["Reserva de áreas comuns (piscina, churrasqueira, salão)", "Calendário de disponibilidade", "Histórico de reservas", "Notificação de confirmação"] },
        { p: "✦ Novo · Acesso & Mapas", items: ["Chave de acesso digital via app", "Mapa interativo do empreendimento", "Agendamento de serviços (limpeza, manutenção)", "QR code de acesso a áreas restritas"] },
      ],
    },
  };

  const sel = selected ? (SYSTEMS[selected] || null) : null;

  const nodesByPhase = {
    F1: ["backend","menfe","backoffice"],
    F2: ["backend","menfe","collegiate","backoffice"],
    F3: ["backend","menfe","collegiate_f3","backoffice"],
  };
  const phaseLabels = { F1:"Fase 1 · App do Investidor + Backoffice + Backend F1", F2:"Fase 2 · App Collegiate + App Menfe F2 + Backoffice F2 + Backend F2", F3:"Fase 3 · App Collegiate F3 (novas features) + App Menfe (mantido) + Backoffice F3 + Backend F3" };
  const visibleNodes = nodesByPhase[phase];

  function VLine() { return <div style={{ width: 1, height: 28, backgroundColor: "rgba(0,0,0,0.12)", margin: "0 auto" }} />; }
  function HLine() { return <div style={{ flex: 1, height: 1, backgroundColor: "rgba(0,0,0,0.12)", marginTop: 14 }} />; }

  return (
    <div style={{ flex: 1, overflowY: "auto", backgroundColor: C.offwhite }}>
      <div style={{ padding: "12px 26px 12px", backgroundColor: C.white, borderBottom: `0.5px solid ${C.border}`, borderTop:`3px solid ${phColor}` }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: phColor, marginBottom:2 }}>{phase === "F1" ? "Fase 1" : phase === "F2" ? "Fase 2" : "Fase 3"} · Arquitetura</div>
        <div style={{ fontSize: 11, color: C.gray400 }}>{phaseLabels[phase]}</div>
      </div>
      <div style={{ padding: "28px 40px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: C.gray400, marginBottom: 28 }}>
          Clique em qualquer sistema para expandir detalhes e funcionalidades
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 960 }}>
          {visibleNodes.includes("backend") && <>
            <SitemapNode sys={SYSTEMS.backend} id="backend" selected={selected} onSelect={setSelected} />
            <VLine />
          </>}
          <div style={{ display: "flex", alignItems: "flex-start", width: "100%", gap: 0 }}>
            <HLine />
            <div style={{ ...pill(C.greenL, "#2D7D46"), margin: "0 8px", flexShrink: 0, fontSize: 10 }}>API REST</div>
            <div style={{ width: 60 }} />
            <div style={{ ...pill(C.greenL, "#2D7D46"), margin: "0 8px", flexShrink: 0, fontSize: 10 }}>API REST</div>
            <HLine />
          </div>
          <div style={{ display: "flex", gap: 24, width: "100%", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: 340 }}>
              {visibleNodes.includes("menfe") && <><VLine /><SitemapNode sys={SYSTEMS.menfe} id="menfe" selected={selected} onSelect={setSelected} /></>}
              {visibleNodes.includes("backoffice") && <><VLine /><SitemapNode sys={SYSTEMS.backoffice} id="backoffice" selected={selected} onSelect={setSelected} /></>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: 340 }}>
              {visibleNodes.includes("collegiate") && <><VLine /><SitemapNode sys={SYSTEMS.collegiate} id="collegiate" selected={selected} onSelect={setSelected} /></>}
              {visibleNodes.includes("collegiate_f3") && (
                <>
                  <VLine />
                  <div style={{ position:"relative", width:"100%", maxWidth:400 }}>
                    <SitemapNode sys={SYSTEMS.collegiate_f3} id="collegiate_f3" selected={selected} onSelect={setSelected} />
                    <div style={{ position:"absolute", top:-10, right:8, backgroundColor:"#B45309", color:"#fff", fontSize:9, fontWeight:800, borderRadius:20, padding:"2px 9px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Expansão F2→F3</div>
                  </div>
                </>
              )}
              {visibleNodes.includes("leads") && <><VLine /><SitemapNode sys={SYSTEMS.leads} id="leads" selected={selected} onSelect={setSelected} /></>}
            </div>
          </div>
        </div>

        {sel && (
          <div style={{ marginTop: 28, width: "100%", maxWidth: 960, ...card({ overflow: "hidden" }) }}>
            <div style={{ padding: "14px 22px", borderBottom: `0.5px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, backgroundColor: `${sel.colorL}88` }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: sel.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{sel.abbr}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.gray800 }}>{sel.label}</div>
                <div style={{ fontSize: 11, color: C.gray400 }}>{sel.sub}</div>
              </div>
              {sel.abbr === "F3+" && (
                <div style={{ fontSize: 10.5, color: "#B45309", backgroundColor: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 8, padding: "4px 10px", fontWeight: 700 }}>
                  ✦ Todas as telas abaixo são novas — construídas sobre a base da Fase 2
                </div>
              )}
              <button onClick={() => setSelected(null)} style={{ border: "none", background: "rgba(0,0,0,0.06)", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 11, color: C.gray600 }}>fechar ✕</button>
            </div>
            <div style={{ padding: "18px 22px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
              <div>
                <div style={{ fontSize: 10.5, color: C.gray400, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
                  {sel.abbr === "F3+" ? "Novas funcionalidades implementadas na Fase 3" : "Telas e funcionalidades por módulo"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {sel.screens.map(sc => (
                    <div key={sc.p} style={{ backgroundColor: sc.p.startsWith("✦") ? "#FFFBEB" : "transparent", borderRadius: sc.p.startsWith("✦") ? 10 : 0, padding: sc.p.startsWith("✦") ? "10px 12px" : 0, border: sc.p.startsWith("✦") ? "1px solid #FCD34D" : "none" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: sc.p.startsWith("✦") ? "#B45309" : sel.color, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{sc.p}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 20px" }}>
                        {sc.items.map(it => (
                          <div key={it} style={{ fontSize: 12, color: "#555", display: "flex", gap: 7, alignItems: "flex-start", padding: "2px 0" }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: sc.p.startsWith("✦") ? "#B45309" : sel.color, flexShrink: 0, marginTop: 5 }} />{it}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10.5, color: C.gray400, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Sobre o sistema</div>
                <div style={{ fontSize: 12, color: C.gray600, lineHeight: 1.7 }}>{sel.desc}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: ROADMAP (phase-aware)
// ═══════════════════════════════════════════════════════════════════════════════
const ROADMAP_DATA = {
  F1: {
    phaseLabel: "Fase 1", months: [1,2,3,4], color: "#1A2445", colorL: "#EEF0FC",
    desc: "App do Investidor (React Native) + Backoffice Admin (NextJS) + Backend F1",
    tracks: [
      { label:"Backend · NestJS + PostgreSQL", badge:"BE", color:"#2D7D46", colorL:"#F0FAF4", items:[
        { name:"Autenticação e RBAC",                    ms:[1] },
        { name:"CRUD gerentes, empreendimentos, invest.", ms:[1] },
        { name:"Logs e auditoria",                       ms:[1,2,3,4] },
        { name:"Infraestrutura / DevOps",                ms:[1,2,3,4] },
        { name:"Gestão financeira (investidor)",         ms:[1,2] },
        { name:"Integração bancária (Pix, Boleto)",      ms:[2] },
        { name:"Contratos",                              ms:[3] },
        { name:"Gestão de patrimônio",                   ms:[3] },
        { name:"Evolução de obra",                       ms:[4] },
        { name:"Notificações push (FCM)",                ms:[4] },
      ]},
      { label:"App Menfe · React Native", badge:"MB", color:"#1A2445", colorL:"#EEF0FC", items:[
        { name:"Autenticação e permissões",              ms:[1] },
        { name:"Gestão Financeira",                      ms:[1,2] },
        { name:"Log de Atividades",                      ms:[1,2,3,4] },
        { name:"Listagem de Empreendimentos",            ms:[2] },
        { name:"Patrimônio",                             ms:[2,3] },
        { name:"Contratos",                              ms:[3] },
        { name:"Evolução de Obra",                       ms:[4] },
        { name:"Notificações",                           ms:[4] },
      ]},
      { label:"Backoffice · NextJS", badge:"BO", color:"#7C3AED", colorL:"#F5F3FF", items:[
        { name:"Gerenciamento de permissões (RBAC)",     ms:[1] },
        { name:"Gestão Financeira",                      ms:[1] },
        { name:"Logs de acessos e atividades",           ms:[1,2,3,4] },
        { name:"Gestão de Obras",                        ms:[2] },
        { name:"Gestão de Empreendimentos",              ms:[2,3] },
        { name:"Gestão de Contratos",                    ms:[4] },
      ]},
      { label:"Design · Product Designer", badge:"UX", color:"#0E7490", colorL:"#ECFEFF", items:[
        { name:"Design System & Componentes F1",         ms:[1,2] },
        { name:"Protótipo App do Investidor",            ms:[1,2] },
        { name:"Handoff F1 para dev",                   ms:[2] },
      ]},
      { label:"Gestão de Projeto", badge:"GP", color:"#BE185D", colorL:"#FCE7F3", items:[
        { name:"Coordenação · 40h/mês",                  ms:[1,2,3,4] },
      ]},
    ],
  },
  F2: {
    phaseLabel: "Fase 2", months: [5,6,7,8], color: "#C44A18", colorL: "#FEF0EB",
    desc: "App Collegiate Inquilino + App Menfe F2 + Backoffice F2 + Backend F2",
    tracks: [
      { label:"Backend · NestJS + PostgreSQL", badge:"BE", color:"#2D7D46", colorL:"#F0FAF4", items:[
        { name:"Sistema de venda de empreendimentos",    ms:[5,6] },
        { name:"Gestão de carrinho (investidores)",      ms:[6] },
        { name:"CRUD quartos, hóspedes",                 ms:[6] },
        { name:"Gestão de carrinho (hóspedes)",          ms:[7] },
        { name:"Sistema de booking",                     ms:[7,8] },
        { name:"Gestão financeira (hóspedes)",           ms:[8] },
      ]},
      { label:"App Menfe · React Native", badge:"MB", color:"#1A2445", colorL:"#EEF0FC", items:[
        { name:"Mapas",                                  ms:[5] },
        { name:"Gestão de Investimentos",                ms:[5] },
        { name:"Carrinho",                               ms:[6] },
      ]},
      { label:"App Collegiate · React Native", badge:"CO", color:"#C44A18", colorL:"#FEF0EB", items:[
        { name:"Autenticação e permissões",              ms:[5] },
        { name:"Perfil",                                 ms:[5] },
        { name:"Lista de Quartos",                       ms:[6] },
        { name:"Serviços",                               ms:[6] },
        { name:"Carrinho",                               ms:[7] },
        { name:"Gestão de Reservas",                     ms:[7] },
        { name:"Financeiro",                             ms:[8] },
        { name:"Avisos e Notificações",                  ms:[8] },
      ]},
      { label:"Backoffice · NextJS", badge:"BO", color:"#7C3AED", colorL:"#F5F3FF", items:[
        { name:"Gestão de Hóspedes",                     ms:[6] },
        { name:"Gestão de Quartos",                      ms:[6] },
        { name:"Gestão de Serviços",                     ms:[6] },
        { name:"Gestão de Reservas",                     ms:[7,8] },
      ]},
      { label:"Design · Product Designer · 1,5 mês", badge:"UX", color:"#0E7490", colorL:"#ECFEFF", items:[
        { name:"Design System & Protótipo App Collegiate", ms:[5,6] },
        { name:"Handoff F2 para dev",                      ms:[6] },
      ]},
      { label:"Gestão de Projeto", badge:"GP", color:"#BE185D", colorL:"#FCE7F3", items:[
        { name:"Coordenação · 40h/mês",                  ms:[5,6,7,8] },
      ]},
    ],
  },
  F3: {
    phaseLabel: "Fase 3", months: [9,10,11,12], color: "#2D7D46", colorL: "#E8F5EE",
    desc: "App Collegiate F3 + Backoffice F3 + Backend F3",
    tracks: [
      { label:"Backend · NestJS + PostgreSQL", badge:"BE", color:"#2D7D46", colorL:"#F0FAF4", items:[
        { name:"Gestão de quartos",                      ms:[9] },
        { name:"Reservas de áreas comuns e serviços",    ms:[9] },
        { name:"Acessos (chaves e amenidades)",          ms:[10] },
      ]},
      { label:"App Collegiate · React Native", badge:"CO", color:"#C44A18", colorL:"#FEF0EB", items:[
        { name:"Chat",                                   ms:[9] },
        { name:"Gestão de Quartos",                      ms:[9,10] },
        { name:"Reserva de áreas comuns",                ms:[10] },
        { name:"Mapas",                                  ms:[11] },
        { name:"Chave de acesso",                        ms:[11] },
        { name:"Agendamento de serviços",                ms:[12] },
      ]},
      { label:"Backoffice · NextJS", badge:"BO", color:"#7C3AED", colorL:"#F5F3FF", items:[
        { name:"Gestão de áreas comuns",                 ms:[9] },
      ]},
      { label:"Design · Product Designer · 2 meses", badge:"UX", color:"#0E7490", colorL:"#ECFEFF", items:[
        { name:"Design System & Protótipo App Leads F3", ms:[9,10] },
        { name:"Handoff F3 para dev",                    ms:[10] },
      ]},
      { label:"Gestão de Projeto", badge:"GP", color:"#BE185D", colorL:"#FCE7F3", items:[
        { name:"Coordenação · 40h/mês",                  ms:[9,10,11,12] },
      ]},
    ],
  },
};

function PageRoadmapPhase({ phase }) {
  const COL_W = 88;
  const ROW_H = 32;
  const LABEL_W = 240;
  const data = ROADMAP_DATA[phase];
  const months = data.months;
  const NM = months.length;
  const phColor = data.color;

  return (
    <div style={{ flex:1, overflowY:"auto", backgroundColor:C.white }}>
      {/* Header */}
      <div style={{ padding:"14px 24px 12px", borderBottom:`0.5px solid ${C.border}`, background:`linear-gradient(135deg,${phColor}08,${phColor}03)`, borderTop:`3px solid ${phColor}` }}>
        <div style={{ fontSize:16, fontWeight:800, color:phColor, marginBottom:3 }}>{data.phaseLabel} · Roadmap</div>
        <div style={{ fontSize:11.5, color:C.gray400 }}>{data.desc}</div>
      </div>

      {/* Gantt */}
      <div style={{ padding:"20px 24px 36px", overflowX:"auto" }}>
        <div style={{ minWidth: LABEL_W + NM*COL_W }}>
          {/* Month header */}
          <div style={{ display:"flex", marginBottom:4 }}>
            <div style={{ width:LABEL_W, flexShrink:0 }} />
            {months.map(m => (
              <div key={m} style={{ width:COL_W, flexShrink:0, textAlign:"center", paddingBottom:7, borderBottom:`2px solid ${phColor}`, borderLeft:`0.5px solid ${C.border}` }}>
                <div style={{ fontSize:13, fontWeight:800, color:phColor }}>M{m}</div>
              </div>
            ))}
          </div>

          {data.tracks.map((track, ti) => (
            <div key={track.badge}>
              {/* Track header */}
              <div style={{ display:"flex", alignItems:"center", gap:9, padding:"10px 0 5px", marginTop: ti>0?12:0 }}>
                <div style={{ width:26, height:26, borderRadius:7, backgroundColor:track.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:"#fff", flexShrink:0 }}>{track.badge}</div>
                <span style={{ fontSize:11, fontWeight:700, color:track.color, textTransform:"uppercase", letterSpacing:"0.07em" }}>{track.label}</span>
              </div>
              {track.items.map((item) => {
                const minM = Math.min(...item.ms);
                const maxM = Math.max(...item.ms);
                const barLeft = LABEL_W + (minM - months[0]) * COL_W + 4;
                const barW    = (maxM - minM + 1) * COL_W - 8;
                return (
                  <div key={item.name} style={{ display:"flex", height:ROW_H, position:"relative", borderBottom:`0.5px solid ${C.border}` }}>
                    <div style={{ width:LABEL_W, flexShrink:0, display:"flex", alignItems:"center", paddingLeft:16, fontSize:11.5, color:C.gray600 }}>{item.name}</div>
                    {months.map(m => (
                      <div key={m} style={{ width:COL_W, flexShrink:0, height:"100%", borderLeft:`0.5px solid ${C.border}` }} />
                    ))}
                    <div style={{ position:"absolute", left:barLeft, width:barW, top:5, bottom:5, backgroundColor:track.color, borderRadius:5, opacity:0.85, display:"flex", alignItems:"center", paddingLeft:8, overflow:"hidden" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"#fff", whiteSpace:"nowrap", opacity:barW>60?1:0 }}>{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageRoadmap() { return <PageRoadmapPhase phase="F1" />; }

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: TEAM (phase-aware)
// ═══════════════════════════════════════════════════════════════════════════════

const TEAM_DATA = {
  F1: {
    phaseLabel:"Fase 1", months:[1,2,3,4], color:"#1A2445",
    roles:[
      { abbr:"BE", role:"Backend Pleno",         type:"Full-time · 160h/mês", color:"#2D7D46", ms:[1,4], skills:["NestJS","PostgreSQL","JWT","Docker","CI/CD"], resp:["Auth e RBAC","Financeiro investidor","Contratos e patrimônio","Logs, auditoria e DevOps"] },
      { abbr:"MB", role:"Mobile · React Native",  type:"Full-time · 160h/mês", color:"#1A2445", ms:[1,4], skills:["React Native","TypeScript","iOS","Android","FCM"], resp:["App Menfe F1 completo","Auth, portfólio, obras, financeiro","Notificações push e log de atividades"] },
      { abbr:"FE", role:"Frontend · NextJS",       type:"Full-time · 160h/mês", color:"#7C3AED", ms:[1,4], skills:["NextJS","React","TypeScript","CSS Modules"], resp:["Backoffice Admin completo","RBAC, gestão de obras e contratos","Painel financeiro e investidores"] },
      { abbr:"UX", role:"Product Designer",        type:"Part-time · 80h/mês",  color:"#0E7490", ms:[1,2], skills:["Figma","Design System","Handoff","UX Research"], resp:["Design System Menfe","Protótipo App do Investidor","Handoff para dev"] },
      { abbr:"GP", role:"Gestor de Projetos",      type:"Part-time · 40h/mês",  color:"#BE185D", ms:[1,4], skills:["Scrum","Jira","Roadmap","Stakeholders"], resp:["Coordenação do squad","Gestão de backlog e sprints","Relatórios de progresso"] },
    ],
  },
  F2: {
    phaseLabel:"Fase 2", months:[5,6,7,8], color:"#C44A18",
    roles:[
      { abbr:"BE", role:"Backend Pleno",         type:"Full-time · 160h/mês", color:"#2D7D46", ms:[5,8], skills:["NestJS","Booking","Gateway Pgto"], resp:["Sistema de venda e booking","Carrinho investidor e hóspedes","Financeiro hóspedes"] },
      { abbr:"MB", role:"Mobile · React Native",  type:"Full-time · 160h/mês", color:"#1A2445", ms:[5,8], skills:["React Native","TypeScript","iOS","Android"], resp:["App Collegiate: auth, quartos, reservas","App Menfe F2: mapas, investimentos, carrinho"] },
      { abbr:"FE", role:"Frontend · NextJS",       type:"Full-time · 160h/mês", color:"#7C3AED", ms:[5,8], skills:["NextJS","React","TypeScript"], resp:["Backoffice: hóspedes, quartos, serviços","Gestão de reservas F2"] },
      { abbr:"UX", role:"Product Designer",        type:"Part-time · 80h/mês · 1,5 mês",  color:"#0E7490", ms:[5,6], skills:["Figma","Design System","Handoff"], resp:["Design System Collegiate","Protótipo App Collegiate","Protótipo App Menfe F2","Handoff F2"] },
      { abbr:"GP", role:"Gestor de Projetos",      type:"Part-time · 40h/mês",  color:"#BE185D", ms:[5,8], skills:["Scrum","Jira","Roadmap"], resp:["Coordenação F2","Backlog e sprints","Alinhamento stakeholders"] },
    ],
  },
  F3: {
    phaseLabel:"Fase 3", months:[9,10,11,12], color:"#2D7D46",
    roles:[
      { abbr:"BE", role:"Backend Pleno",         type:"Full-time · 160h/mês", color:"#2D7D46", ms:[9,10], skills:["NestJS","PostgreSQL","Acessos"], resp:["Gestão de quartos e reservas","Áreas comuns e serviços","Chaves e acessos"] },
      { abbr:"MB", role:"Mobile · React Native",  type:"Full-time · 160h/mês", color:"#1A2445", ms:[9,12], skills:["React Native","TypeScript","iOS","Android"], resp:["App Collegiate F3: chat, quartos","Reservas áreas comuns, mapas","Chave de acesso e agendamento"] },
      { abbr:"FE", role:"Frontend · NextJS",       type:"Full-time · 160h/mês", color:"#7C3AED", ms:[9,9],  skills:["NextJS","React"], resp:["Backoffice: gestão de áreas comuns"] },
      { abbr:"UX", role:"Product Designer",        type:"Part-time · 80h/mês · 2 meses",  color:"#0E7490", ms:[9,10], skills:["Figma","Handoff","UX Research"], resp:["Protótipo App Leads F3","Handoff F3 completo","Ajustes e validações finais"] },
      { abbr:"GP", role:"Gestor de Projetos",      type:"Part-time · 40h/mês",  color:"#BE185D", ms:[9,12], skills:["Scrum","Jira","Go-live"], resp:["Coordenação F3 e go-live","Gestão de riscos finais","Entrega e encerramento"] },
    ],
  },
};

function PageTeamPhase({ phase }) {
  const COL_W = 100;
  const ROW_H = 44;
  const LABEL_W = 200;
  const DED_W = 160;
  const data = TEAM_DATA[phase];
  const months = data.months;
  const phColor = data.color;

  const hatch = (color) => ({
    background: `repeating-linear-gradient(45deg, ${color}BB, ${color}BB 4px, transparent 4px, transparent 9px)`,
    border: `1.5px solid ${color}`,
  });

  const isLite = (abbr) => abbr === "UX" || abbr === "GP";

  return (
    <div style={{ flex:1, overflowY:"auto", backgroundColor:C.white }}>
      <div style={{ padding:"14px 24px 12px", borderBottom:`0.5px solid ${C.border}`, borderTop:`3px solid ${phColor}`, background:`linear-gradient(135deg,${phColor}08,transparent)` }}>
        <div style={{ fontSize:16, fontWeight:800, color:phColor, marginBottom:3 }}>{data.phaseLabel} · Equipe</div>
        <div style={{ fontSize:11.5, color:C.gray400 }}>Composição do time e dedicação por mês</div>
      </div>

      {/* Gantt */}
      <div style={{ padding:"20px 24px", overflowX:"auto" }}>
        <div style={{ minWidth: LABEL_W + DED_W + months.length * COL_W }}>
          {/* Header */}
          <div style={{ display:"flex" }}>
            <div style={{ width:LABEL_W, flexShrink:0, fontSize:10, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.08em", paddingBottom:8, borderBottom:`0.5px solid ${C.border}` }}>PAPEL</div>
            <div style={{ width:DED_W, flexShrink:0, fontSize:10, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.08em", paddingBottom:8, borderBottom:`0.5px solid ${C.border}` }}>DEDICAÇÃO</div>
            {months.map(m => (
              <div key={m} style={{ width:COL_W, flexShrink:0, textAlign:"center", paddingBottom:8, borderBottom:`2px solid ${phColor}`, borderLeft:`0.5px solid ${C.border}`, backgroundColor:`${phColor}08` }}>
                <div style={{ fontSize:13, fontWeight:800, color:phColor }}>M{m}</div>
              </div>
            ))}
          </div>

          {/* Role rows */}
          {data.roles.map((r, ri) => {
            const left  = LABEL_W + DED_W + (r.ms[0] - months[0]) * COL_W + 4;
            const width = (r.ms[1] - r.ms[0] + 1) * COL_W - 8;
            const barStyle = isLite(r.abbr)
              ? { ...hatch(r.color), borderRadius:6 }
              : { backgroundColor:r.color, opacity:0.88, borderRadius:6 };
            return (
              <div key={r.abbr} style={{ display:"flex", alignItems:"center", height:ROW_H, position:"relative", borderBottom:`0.5px solid ${C.border}`, backgroundColor: ri%2===0?C.white:C.gray50 }}>
                <div style={{ width:LABEL_W, flexShrink:0, display:"flex", alignItems:"center", gap:9, paddingLeft:4, height:"100%" }}>
                  <div style={{ width:28, height:28, borderRadius:7, backgroundColor:r.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9.5, fontWeight:800, color:"#fff", flexShrink:0 }}>{r.abbr}</div>
                  <span style={{ fontSize:12, fontWeight:600, color:C.gray800 }}>{r.role}</span>
                </div>
                <div style={{ width:DED_W, flexShrink:0, height:"100%", display:"flex", alignItems:"center", paddingLeft:6 }}>
                  <span style={{ fontSize:11, color:C.gray600 }}>{r.type}</span>
                </div>
                {months.map(m => (
                  <div key={m} style={{ width:COL_W, flexShrink:0, height:"100%", borderLeft:`0.5px solid ${C.border}` }} />
                ))}
                <div style={{ position:"absolute", left, width, top:8, bottom:8, ...barStyle, display:"flex", alignItems:"center", paddingLeft:9, overflow:"hidden" }}>
                  <span style={{ fontSize:10, fontWeight:700, color: isLite(r.abbr)?r.color:"#fff", whiteSpace:"nowrap", opacity: width>80?1:0 }}>{r.type.split(" ")[0]}</span>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div style={{ display:"flex", gap:20, padding:"10px 0 6px", flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:28, height:12, borderRadius:3, backgroundColor:"#374151" }}/>
              <span style={{ fontSize:11, color:C.gray600 }}>Full-time · 160h/mês</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:28, height:12, borderRadius:3, background:"repeating-linear-gradient(45deg,#0E7490,#0E7490 3px,transparent 3px,transparent 7px)", border:"1.5px solid #0E7490" }}/>
              <span style={{ fontSize:11, color:C.gray600 }}>Part-time · 80h/mês (Designer)</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:28, height:12, borderRadius:3, background:"repeating-linear-gradient(45deg,#BE185D,#BE185D 3px,transparent 3px,transparent 7px)", border:"1.5px solid #BE185D" }}/>
              <span style={{ fontSize:11, color:C.gray600 }}>Part-time · 40h/mês (GP)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div style={{ padding:"0 24px 36px" }}>
        <div style={{ fontSize:10, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:12 }}>Responsabilidades por Papel</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {data.roles.map(r => (
            <div key={r.abbr} style={{ backgroundColor:C.white, border:`0.5px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9 }}>
                <div style={{ width:30, height:30, borderRadius:8, backgroundColor:r.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:"#fff", flexShrink:0 }}>{r.abbr}</div>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:700, color:C.gray800 }}>{r.role}</div>
                  <div style={{ fontSize:10, color:C.gray400 }}>{r.type}</div>
                </div>
              </div>
              <div style={{ fontSize:10, color:C.gray400, marginBottom:7 }}>{r.skills.join(" · ")}</div>
              <div style={{ borderTop:`0.5px solid ${C.border}`, paddingTop:7 }}>
                {r.resp.map(rp => (
                  <div key={rp} style={{ display:"flex", gap:7, alignItems:"flex-start", padding:"2px 0" }}>
                    <div style={{ width:4, height:4, borderRadius:"50%", backgroundColor:r.color, flexShrink:0, marginTop:5 }}/>
                    <span style={{ fontSize:11, color:C.gray600, lineHeight:1.5 }}>{rp}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageTeam() { return <PageTeamPhase phase="F1" />; }


// ═══════════════════════════════════════════════════════════════════════════════
// PHONE FRAME
// ═══════════════════════════════════════════════════════════════════════════════
function PhoneFrame({ label, children, accent = "#1E3A5F" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: 9.5, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>{label}</div>
      <div style={{
        width: 320, backgroundColor: "#111", borderRadius: 44, padding: "12px 6px 16px",
        boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07), 0 0 60px ${accent}33`,
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
          <div style={{ width: 90, height: 26, backgroundColor: "#0A0A0A", borderRadius: 16 }} />
        </div>
        <div style={{ borderRadius: 34, overflow: "hidden", height: 620, backgroundColor: "#F5F4F1", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <div style={{ width: 80, height: 3.5, backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROTOTYPE: APP MENFE · INVESTIDOR
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// PROTOTYPE: APP MENFE · INVESTIDOR  (redesign — menfe.com.br aesthetic)
// ═══════════════════════════════════════════════════════════════════════════════

// ── Menfe app design tokens (extraídos do site) ──
const MA = {
  navy:     "#080C1E",
  navyM:    "#0E1530",
  navyL:    "#1A2445",
  navyXL:   "#233060",
  blue:     "#3B45C8",
  blueM:    "#4D57D4",
  blueL:    "#6B76DF",
  blueXL:   "#EEF0FC",
  blueDark: "#2A34A4",
  gold:     "#C9A84C",
  goldD:    "#A8842A",
  goldL:    "#F6EDD4",
  bg:       "#EDF0F8",
  white:    "#FFFFFF",
  text:     "#090D1E",
  textM:    "#454A68",
  textL:    "#8890AB",
  border:   "rgba(9,13,30,0.06)",
  borderM:  "rgba(9,13,30,0.10)",
  green:    "#0D9B6E",
  greenL:   "#E0F5EE",
  greenT:   "#0A7A56",
  red:      "#E03A3A",
  redL:     "#FEE5E5",
};
const MFH = "'Syne','Helvetica Neue',sans-serif";
const MFB = "'DM Sans','Helvetica',sans-serif";

function mfmt(v) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const MPATHS = {
  home:     "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5zM9 21V12h6v9",
  grid:     "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  chart:    "M18 20V10M12 20V4M6 20v-6",
  user:     "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  bell:     "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  chevronR: "M9 18l6-6-6-6",
  chevronL: "M15 18l-6-6 6-6",
  building: "M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V9m0 0h6M15 21V9",
  doc:      "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  chat:     "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  trending: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  calendar: "M3 9h18M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  logout:   "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
};

function MIcon({ name, size = 18, color = "currentColor", sw = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={MPATHS[name] || ""} />
    </svg>
  );
}

function MPropImg({ gradient, w = 70, h = 72 }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 12, flexShrink: 0, background: gradient, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MIcon name="building" size={22} color="rgba(255,255,255,0.28)" sw={1} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 20, background: "linear-gradient(transparent,rgba(0,0,0,0.28))" }} />
    </div>
  );
}

function MStatusBadge({ status }) {
  const map = {
    "Em obras":    { bg: MA.blueXL,  color: MA.blueDark, t: "EM OBRAS"    },
    "Pronto":      { bg: MA.greenL,  color: MA.greenT,   t: "PRONTO"      },
    "Lançamento":  { bg: MA.goldL,   color: MA.goldD,    t: "LANÇAMENTO"  },
    "100% Vendido":{ bg: "#F0F1F5", color: "#6B7280",   t: "100% VENDIDO"},
  };
  const d = map[status] || map["Lançamento"];
  return (
    <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.07em", backgroundColor: d.bg, color: d.color, padding: "2px 7px", borderRadius: 4, fontFamily: MFB }}>
      {d.t}
    </span>
  );
}

const MIMOVEIS = [
  { id: 0, name: "Collegiate Uberaba 2",  sub: "Unidade 308 · Torre Leste", status: "Lançamento", vgv: 1850000, obra: 8,   gradient: "linear-gradient(145deg,#0C1A36,#163055,#1E4077)" },
  { id: 1, name: "Collegiate Varginha",   sub: "Unidade 1205 · Setor Sul",  status: "Em obras",   vgv: 1220000, obra: 68,  gradient: "linear-gradient(145deg,#1C0F40,#2E1A62,#3D2990)" },
  { id: 2, name: "Collegiate Barbacena",  sub: "Unidade 401 · Bloco A",     status: "Pronto",     vgv: 980000,  obra: 100, gradient: "linear-gradient(145deg,#0C2718,#184030,#205540)" },
];

function PagePrototypeMenfe() {
  const [screen, setScreen]       = useState("home");
  const [detail, setDetail]       = useState(null);
  const [onboarded, setOnboarded] = useState(false);

  // ── Login Screen ──
  function LoginScreen() {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: `linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding: "0 26px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontSize: 42, fontWeight: 800, color: MA.white, fontFamily: MFH, letterSpacing: "-1.5px", marginBottom: 8 }}>menfe.</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: MFB, marginBottom: 44 }}>Plataforma de Investimento Imobiliário</div>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginBottom: 2 }}>CPF ou e-mail</div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "13px 16px", border: "1px solid rgba(255,255,255,0.1)", fontSize: 13, color: "rgba(255,255,255,0.25)", fontFamily: MFB }}>Digite seu CPF ou e-mail</div>
            <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginTop: 6, marginBottom: 2 }}>Senha</div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "13px 16px", border: "1px solid rgba(255,255,255,0.1)", fontSize: 13, color: "rgba(255,255,255,0.25)", fontFamily: MFB }}>••••••••</div>
            <div style={{ textAlign: "right", fontSize: 11, color: MA.gold, fontWeight: 600, fontFamily: MFB, cursor: "pointer", marginTop: 2 }}>Esqueci minha senha</div>
            <div onClick={() => setOnboarded(true)} style={{ marginTop: 6, backgroundColor: MA.blue, borderRadius: 14, padding: "14px", textAlign: "center", fontSize: 13.5, fontWeight: 700, color: MA.white, cursor: "pointer", fontFamily: MFH, letterSpacing: "0.02em", boxShadow: `0 12px 36px ${MA.blue}55` }}>Entrar →</div>
            <div style={{ textAlign: "center", fontSize: 11.5, color: "rgba(255,255,255,0.3)", fontFamily: MFB, marginTop: 4 }}>
              Não tem conta? <span style={{ color: MA.gold, fontWeight: 600, cursor: "pointer" }}>Criar acesso</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Bottom NavBar ──
  function NavBar() {
    const tabs = [
      { k: "home",         icon: "home",    label: "Início"      },
      { k: "portfolio",    icon: "grid",    label: "Portfólio"   },
      { k: "lancamentos",  icon: "trending",label: "Oportunid."  },
      { k: "financeiro",   icon: "chart",   label: "Financeiro"  },
      { k: "perfil",       icon: "user",    label: "Perfil"      },
    ];
    return (
      <div style={{ backgroundColor: MA.white, borderTop: `1px solid ${MA.border}`, display: "flex", padding: "8px 0 14px", flexShrink: 0 }}>
        {tabs.map(t => {
          const a = screen === t.k;
          return (
            <div key={t.k} onClick={() => { setScreen(t.k); setDetail(null); }}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
              <MIcon name={t.icon} size={17} color={a ? MA.blue : MA.textL} sw={a ? 2 : 1.5} />
              <span style={{ fontSize: 8.5, fontWeight: a ? 700 : 400, color: a ? MA.blue : MA.textL, fontFamily: MFB }}>{t.label}</span>
              {a && <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: MA.blue }} />}
            </div>
          );
        })}
      </div>
    );
  }

  // ── HOME ──
  function HomeScreen() {
    return (
      <div style={{ flex: 1, overflowY: "auto", backgroundColor: MA.bg }}>
        <div style={{ background: `linear-gradient(160deg,${MA.navy} 0%,${MA.navyL} 100%)`, padding: "20px 20px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: "-0.3px", fontWeight: 800, color: MA.white, fontFamily: MFH, marginBottom: 4 }}>menfe.</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: MA.white, fontFamily: MFB }}>Olá, Ricardo</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div onClick={() => setScreen("notificacoes")} style={{ width: 33, height: 33, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                <MIcon name="bell" size={16} color="rgba(255,255,255,0.6)" sw={1.5} />
                <div style={{ position: "absolute", top: 6, right: 7, width: 7, height: 7, borderRadius: "50%", backgroundColor: MA.gold, border: "1.5px solid rgba(0,0,0,0.4)" }} />
              </div>
              <div style={{ width: 33, height: 33, borderRadius: 10, background: `linear-gradient(135deg,${MA.gold},${MA.goldD})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: MA.navy, fontFamily: MFH }}>RC</div>
            </div>
          </div>
          {/* Patrimônio card */}
          <div style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginBottom: 6 }}>Patrimônio Total Investido</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
              <div style={{ fontSize: 23, fontWeight: 800, color: MA.white, letterSpacing: "-0.6px", fontFamily: MFB }}>R$ 1.240.500</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#4ADE80", fontFamily: MFB }}>↑ 12,4%</div>
            </div>
            <div style={{ height: 0.5, backgroundColor: "rgba(255,255,255,0.07)", marginBottom: 12 }} />
            <div style={{ display: "flex" }}>
              {[{ l: "Imóveis", v: "3" }, { l: "Contratos", v: "4" }, { l: "Próx. Vcto", v: "15 OUT" }].map((s, i) => (
                <div key={s.l} style={{ flex: 1, paddingLeft: i > 0 ? 14 : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none", marginLeft: i > 0 ? 14 : 0 }}>
                  <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.32)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: MFB, fontWeight: 600 }}>{s.l}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: MA.white, marginTop: 3, fontFamily: MFB }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: MA.textL, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginBottom: 10 }}>Ações Rápidas</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
            {[
              { icon: "building", label: "Portfólio",    action: () => setScreen("portfolio") },
              { icon: "trending", label: "Lançamentos",  action: () => setScreen("lancamentos") },
              { icon: "chat",     label: "Chat",         action: () => setScreen("chat") },
              { icon: "doc",      label: "Contratos",    action: () => setScreen("contratos") },
            ].map(a => (
              <div key={a.label} onClick={a.action} style={{ backgroundColor: MA.white, borderRadius: 12, padding: "14px 8px", textAlign: "center", cursor: "pointer", border: `0.5px solid ${MA.border}` }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 7 }}>
                  <MIcon name={a.icon} size={18} color={MA.blue} sw={1.5} />
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: MA.textM, fontFamily: MFB }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Launch banner */}
        <div style={{ margin: "12px 16px 0" }}>
          <div onClick={() => setScreen("lancamentos")} style={{ background: `linear-gradient(135deg,${MA.blue} 0%,${MA.blueDark} 100%)`, borderRadius: 14, padding: "14px 16px", cursor: "pointer" }}>
            <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: MFB, marginBottom: 5 }}>Novo Lançamento</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: MA.white, fontFamily: MFH, marginBottom: 3 }}>Collegiate Uberaba 2</div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.55)", fontFamily: MFB, lineHeight: 1.4, marginBottom: 12 }}>Condições especiais para investidores qualificados · 31 Mar</div>
            <div style={{ backgroundColor: MA.gold, borderRadius: 8, padding: "7px 14px", display: "inline-block", fontSize: 10, fontWeight: 700, color: MA.navy, fontFamily: MFH, letterSpacing: "0.05em" }}>ANTECIPE-SE →</div>
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ padding: "12px 16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: MA.textL, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB }}>Atividade Recente</div>
            <span style={{ fontSize: 10, color: MA.blue, fontWeight: 600, fontFamily: MFB, cursor: "pointer" }}>Ver tudo</span>
          </div>
          {[
            { icon: "trending", label: "Aporte Mensal",        date: "12 Out", val: "+R$ 2.500" },
            { icon: "shield",   label: "Dividendos Recebidos", date: "08 Out", val: "+R$ 412"   },
          ].map(a => (
            <div key={a.label} style={{ backgroundColor: MA.white, borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, border: `0.5px solid ${MA.border}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: MA.greenL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MIcon name={a.icon} size={15} color={MA.green} sw={1.5} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: MA.text, fontFamily: MFB }}>{a.label}</div>
                <div style={{ fontSize: 10, color: MA.textL, fontFamily: MFB }}>{a.date}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: MA.green, fontFamily: MFB }}>{a.val}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── PORTFOLIO ──
  function PortfolioScreen() {
    if (detail !== null) {
      const im = MIMOVEIS[detail];
      return (
        <div style={{ flex: 1, overflowY: "auto", backgroundColor: MA.bg }}>
          <div style={{ background: `linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding: "16px 18px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div onClick={() => setDetail(null)} style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <MIcon name="chevronL" size={14} color={MA.white} />
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.55)", fontFamily: MFB }}>Meu Portfólio</span>
            </div>
            <MStatusBadge status={im.status} />
            <div style={{ fontSize: 17, fontWeight: 800, color: MA.white, fontFamily: MFH, marginTop: 7, marginBottom: 3 }}>{im.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: MFB }}>{im.sub}</div>
          </div>
          <div style={{ padding: "14px 16px" }}>
            {/* VGV */}
            <div style={{ backgroundColor: MA.white, borderRadius: 14, padding: 16, marginBottom: 10, border: `0.5px solid ${MA.border}` }}>
              <div style={{ fontSize: 9, color: MA.textL, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginBottom: 6 }}>VGV Valorizado</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <div style={{ fontSize: 21, fontWeight: 800, color: MA.blue, fontFamily: MFB }}>{mfmt(im.vgv)}</div>
                {im.obra === 100 && <span style={{ fontSize: 10.5, fontWeight: 600, color: MA.green, fontFamily: MFB }}>✓ Entregue</span>}
              </div>
            </div>
            {/* Obra progress */}
            {im.obra < 100 && (
              <div style={{ backgroundColor: MA.white, borderRadius: 14, padding: 16, marginBottom: 10, border: `0.5px solid ${MA.border}` }}>
                <div style={{ fontSize: 9, color: MA.textL, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginBottom: 14 }}>Evolução da Obra</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
                    <svg width={52} height={52} style={{ transform: "rotate(-90deg)" }}>
                      <circle cx={26} cy={26} r={20} fill="none" stroke={MA.bg} strokeWidth={5} />
                      <circle cx={26} cy={26} r={20} fill="none" stroke={MA.blue} strokeWidth={5}
                        strokeDasharray={`${(im.obra / 100) * 125.6} 125.6`} strokeLinecap="round" />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: MA.blue, fontFamily: MFB }}>{im.obra}%</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[
                      { l: "Fundação e Estrutura", p: 100 },
                      { l: "Alvenaria e Vedações", p: 85 },
                      { l: "Instalações",          p: Math.max(im.obra - 12, 0) },
                    ].map(e => (
                      <div key={e.l} style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9.5, color: MA.textM, fontFamily: MFB, marginBottom: 3 }}>
                          <span>{e.l}</span><span style={{ fontWeight: 700, color: MA.blue }}>{e.p}%</span>
                        </div>
                        <div style={{ height: 3, backgroundColor: MA.bg, borderRadius: 2 }}>
                          <div style={{ width: `${e.p}%`, height: "100%", background: `linear-gradient(90deg,${MA.blue},${MA.blueL})`, borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Updates */}
            <div style={{ backgroundColor: MA.white, borderRadius: 14, padding: 16, border: `0.5px solid ${MA.border}` }}>
              <div style={{ fontSize: 9, color: MA.textL, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginBottom: 12 }}>Últimas Atualizações</div>
              {[
                { tipo: "Relatório Mensal", data: "12 Out 2024", titulo: "Finalização da concretagem da laje do 15º pavimento." },
                { tipo: "Aviso Técnico",    data: "05 Out 2024", titulo: "Início da instalação das esquadrias de alumínio." },
              ].map(c => (
                <div key={c.titulo} style={{ padding: "10px 0", borderBottom: `0.5px solid ${MA.border}` }}>
                  <div style={{ fontSize: 8.5, color: MA.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: MFB, marginBottom: 4 }}>{c.tipo} · {c.data}</div>
                  <div style={{ fontSize: 11.5, color: MA.text, fontWeight: 500, fontFamily: MFB, lineHeight: 1.4 }}>{c.titulo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, overflowY: "auto", backgroundColor: MA.bg }}>
        <div style={{ background: `linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding: "16px 18px 22px" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginBottom: 5 }}>Seu Patrimônio</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: MA.white, fontFamily: MFH, marginBottom: 12 }}>Meu Portfólio</div>
          <div style={{ display: "flex", gap: 20 }}>
            <div>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: MFB, fontWeight: 600, marginBottom: 3 }}>Equity Atual</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: MA.white, fontFamily: MFB }}>R$ 3.120.000</div>
            </div>
            <div>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: MFB, fontWeight: 600, marginBottom: 3 }}>Rend. Aluguel</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#4ADE80", fontFamily: MFB }}>R$ 12.400/mês</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 16px" }}>
          {MIMOVEIS.map((im, i) => (
            <div key={im.id} onClick={() => setDetail(i)} style={{ backgroundColor: MA.white, borderRadius: 14, padding: 14, marginBottom: 10, display: "flex", gap: 12, cursor: "pointer", border: `0.5px solid ${MA.border}` }}>
              <MPropImg gradient={im.gradient} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                  <MStatusBadge status={im.status} />
                  <MIcon name="chevronR" size={13} color={MA.textL} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: MA.blue, fontFamily: MFH, marginBottom: 2, lineHeight: 1.2 }}>{im.name}</div>
                <div style={{ fontSize: 10, color: MA.textL, fontFamily: MFB, marginBottom: 8 }}>{im.sub}</div>
                {im.obra < 100 ? (
                  <div>
                    <div style={{ height: 3, backgroundColor: MA.bg, borderRadius: 2 }}>
                      <div style={{ width: `${im.obra}%`, height: "100%", background: `linear-gradient(90deg,${MA.blue},${MA.blueL})`, borderRadius: 2 }} />
                    </div>
                    <div style={{ fontSize: 9, color: MA.textL, fontFamily: MFB, marginTop: 3 }}>Obra: {im.obra}%</div>
                  </div>
                ) : (
                  <div style={{ fontSize: 10, color: MA.green, fontWeight: 600, fontFamily: MFB }}>✓ Entregue · {mfmt(im.vgv)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── FINANCEIRO ──
  function FinanceiroScreen() {
    return (
      <div style={{ flex: 1, overflowY: "auto", backgroundColor: MA.bg }}>
        <div style={{ background: `linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding: "16px 18px 26px" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginBottom: 5 }}>Resumo</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: MA.white, fontFamily: MFH, marginBottom: 14 }}>Financeiro</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { l: "Rendimento Total", v: "R$ 14.820", co: "#4ADE80"  },
              { l: "Próx. Parcela",    v: "R$ 2.500",  co: MA.gold    },
              { l: "Dividendos YTD",   v: "R$ 4.940",  co: "#4ADE80"  },
              { l: "Vencimento",       v: "15 OUT",    co: MA.white   },
            ].map(s => (
              <div key={s.l} style={{ background: "rgba(255,255,255,0.045)", borderRadius: 10, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.32)", fontFamily: MFB, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{s.l}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.co, fontFamily: MFB }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "12px 16px 20px" }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: MA.textL, textTransform: "uppercase", letterSpacing: "0.09em", fontFamily: MFB, marginBottom: 10 }}>Histórico de Aportes</div>
          {[
            { mes: "Outubro 2024",  val: "+R$ 2.500", div: "R$ 412" },
            { mes: "Setembro 2024", val: "+R$ 2.500", div: "R$ 398" },
            { mes: "Agosto 2024",   val: "+R$ 2.500", div: "R$ 421" },
            { mes: "Julho 2024",    val: "+R$ 2.500", div: "R$ 380" },
          ].map(a => (
            <div key={a.mes} style={{ backgroundColor: MA.white, borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, border: `0.5px solid ${MA.border}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: MA.greenL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MIcon name="trending" size={15} color={MA.green} sw={1.5} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: MA.text, fontFamily: MFB }}>{a.mes}</div>
                <div style={{ fontSize: 10, color: MA.textL, fontFamily: MFB }}>Dividendos: {a.div}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: MA.green, fontFamily: MFB }}>{a.val}</div>
                <div style={{ fontSize: 9, color: MA.green, fontFamily: MFB }}>Pago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── PERFIL ──
  function PerfilScreen() {
    return (
      <div style={{ flex: 1, overflowY: "auto", backgroundColor: MA.bg }}>
        <div style={{ background: `linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding: "22px 18px 30px", textAlign: "center" }}>
          <div style={{ width: 58, height: 58, borderRadius: 18, background: `linear-gradient(135deg,${MA.gold},${MA.goldD})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: MA.navy, fontFamily: MFH, margin: "0 auto 10px" }}>RC</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: MA.white, fontFamily: MFH, marginBottom: 4 }}>Ricardo Costa</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontFamily: MFB }}>Investidor Qualificado · desde 2021</div>
        </div>
        <div style={{ padding: "12px 16px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
            {[{ l: "Imóveis", v: "3" }, { l: "Contratos", v: "4" }, { l: "Desde", v: "2021" }].map(s => (
              <div key={s.l} style={{ backgroundColor: MA.white, borderRadius: 10, padding: "10px 8px", textAlign: "center", border: `0.5px solid ${MA.border}` }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: MA.blue, fontFamily: MFB }}>{s.v}</div>
                <div style={{ fontSize: 9, color: MA.textL, fontFamily: MFB, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: MA.white, borderRadius: 14, overflow: "hidden", border: `0.5px solid ${MA.border}` }}>
            {[
              { icon: "doc",      label: "Meus Contratos",       action: () => setScreen("contratos") },
              { icon: "calendar", label: "Agenda de Pagamentos", action: () => {} },
              { icon: "bell",     label: "Notificações",         action: () => setScreen("notificacoes") },
              { icon: "shield",   label: "Segurança e Acesso",   action: () => {} },
              { icon: "settings", label: "Configurações",        action: () => {} },
              { icon: "chat",     label: "Ajuda",                action: () => {} },
            ].map((item, i, arr) => (
              <div key={item.label} onClick={item.action} style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: i < arr.length - 1 ? `0.5px solid ${MA.border}` : "none", cursor: "pointer" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: MA.blueXL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MIcon name={item.icon} size={14} color={MA.blue} sw={1.5} />
                </div>
                <span style={{ flex: 1, fontSize: 13, color: MA.text, fontWeight: 500, fontFamily: MFB }}>{item.label}</span>
                <MIcon name="chevronR" size={13} color={MA.textL} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, backgroundColor: MA.white, borderRadius: 14, padding: "13px 16px", display: "flex", alignItems: "center", gap: 12, border: `0.5px solid rgba(224,58,58,0.14)`, cursor: "pointer" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: MA.redL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <MIcon name="logout" size={14} color={MA.red} sw={1.5} />
            </div>
            <span style={{ flex: 1, fontSize: 13, color: MA.red, fontWeight: 600, fontFamily: MFB }}>Sair da conta</span>
          </div>
        </div>
      </div>
    );
  }

  // ── LANÇAMENTOS ──
  function LancamentosScreen() {
    const LANC = [
      { name:"Collegiate Uberaba 2",    city:"Uberaba · MG",         status:"Lançamento",  vgv:"R$ 1.850.000", units:"128 unidades", date:"31 Mar 2025", gradient:`linear-gradient(145deg,${MA.navy},${MA.navyXL})`, hot:true },
      { name:"Collegiate Pouso Alegre 2",city:"Pouso Alegre · MG",   status:"Pré-venda",   vgv:"R$ 1.210.000", units:"96 unidades",  date:"Mai 2025",   gradient:"linear-gradient(145deg,#1C1040,#2E1A66)", hot:false },
      { name:"Collegiate Varginha 2",   city:"Varginha · MG",        status:"Em breve",    vgv:"R$ 980.000",   units:"80 unidades",  date:"Jul 2025",   gradient:"linear-gradient(145deg,#0C2718,#184030)", hot:false },
    ];
    return (
      <div style={{ flex:1, overflowY:"auto", backgroundColor:MA.bg }}>
        <div style={{ background:`linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding:"18px 18px 24px" }}>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.38)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.09em", fontFamily:MFB, marginBottom:5 }}>Acesso Antecipado</div>
          <div style={{ fontSize:18, fontWeight:800, color:MA.white, fontFamily:MFH, marginBottom:4 }}>Novos Lançamentos</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontFamily:MFB }}>Condições exclusivas para investidores qualificados</div>
        </div>
        <div style={{ padding:"12px 16px 20px" }}>
          {LANC.map((l,i) => (
            <div key={l.name} style={{ backgroundColor:MA.white, borderRadius:16, marginBottom:12, overflow:"hidden", border:`0.5px solid ${MA.border}` }}>
              <div style={{ height:80, background:l.gradient, position:"relative", display:"flex", alignItems:"flex-end", padding:"10px 14px" }}>
                {l.hot && <div style={{ position:"absolute", top:10, left:14, backgroundColor:MA.gold, borderRadius:6, padding:"3px 9px", fontSize:8.5, fontWeight:700, color:MA.navy, fontFamily:MFH }}>✦ DESTAQUE</div>}
                <div style={{ fontSize:15, fontWeight:800, color:MA.white, fontFamily:MFH, lineHeight:1.2 }}>{l.name}</div>
              </div>
              <div style={{ padding:"12px 14px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div style={{ fontSize:10.5, color:MA.textL, fontFamily:MFB }}>{l.city} · {l.units}</div>
                  <MStatusBadge status={l.status} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <div>
                    <div style={{ fontSize:8.5, color:MA.textL, fontFamily:MFB, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>VGV estimado</div>
                    <div style={{ fontSize:16, fontWeight:800, color:MA.blue, fontFamily:MFB }}>{l.vgv}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:8.5, color:MA.textL, fontFamily:MFB, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Lançamento</div>
                    <div style={{ fontSize:12, fontWeight:700, color:MA.text, fontFamily:MFB }}>{l.date}</div>
                  </div>
                </div>
                <div style={{ backgroundColor:i===0?MA.blue:MA.blueXL, borderRadius:10, padding:"10px", textAlign:"center", fontSize:11.5, fontWeight:700, color:i===0?MA.white:MA.blue, fontFamily:MFH, cursor:"pointer" }}>
                  {i===0?"Reservar agora →":"Quero ser avisado"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── CONTRATOS ──
  function ContratosScreen() {
    const docs = [
      { name:"Collegiate Uberaba 2 · Unidade 308", tipo:"Contrato de Compra e Venda", data:"15 Jan 2024", size:"2.4 MB" },
      { name:"Collegiate Varginha · Unidade 1205", tipo:"Contrato de Compra e Venda", data:"03 Jun 2023", size:"2.1 MB" },
      { name:"Collegiate Barbacena · Unidade 401", tipo:"Escritura de Propriedade",   data:"22 Nov 2022", size:"1.8 MB" },
      { name:"Adendo de Refinanciamento",          tipo:"Aditivo Contratual",          data:"10 Mar 2024", size:"540 KB" },
    ];
    return (
      <div style={{ flex:1, overflowY:"auto", backgroundColor:MA.bg }}>
        <div style={{ background:`linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding:"18px 18px 22px" }}>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.38)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.09em", fontFamily:MFB, marginBottom:5 }}>Documentos</div>
          <div style={{ fontSize:18, fontWeight:800, color:MA.white, fontFamily:MFH }}>Meus Contratos</div>
        </div>
        <div style={{ padding:"12px 16px 20px" }}>
          <div style={{ backgroundColor:MA.white, borderRadius:14, overflow:"hidden", border:`0.5px solid ${MA.border}` }}>
            {docs.map((d,i,arr) => (
              <div key={d.name} style={{ padding:"14px 16px", borderBottom:i<arr.length-1?`0.5px solid ${MA.border}`:"none" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:9, backgroundColor:MA.blueXL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <MIcon name="doc" size={16} color={MA.blue} sw={1.5} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:MA.text, fontFamily:MFB, lineHeight:1.3, marginBottom:3 }}>{d.name}</div>
                    <div style={{ fontSize:10.5, color:MA.textL, fontFamily:MFB }}>{d.tipo} · {d.data}</div>
                  </div>
                </div>
                <div style={{ marginTop:10, display:"flex", gap:8 }}>
                  <div style={{ flex:1, backgroundColor:MA.blueXL, borderRadius:8, padding:"8px", textAlign:"center", fontSize:10.5, fontWeight:700, color:MA.blue, fontFamily:MFB, cursor:"pointer" }}>
                    ↓ Baixar PDF
                  </div>
                  <div style={{ backgroundColor:MA.bg, borderRadius:8, padding:"8px 12px", fontSize:10, color:MA.textL, fontFamily:MFB }}>{d.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── NOTIFICAÇÕES ──
  function NotificacoesScreen() {
    const notifs = [
      { icon:"trending", title:"Dividendos creditados",        body:"R$ 412,45 creditados referentes a Out/2024.", time:"Hoje, 09:14",  bg:MA.greenL,  ic:MA.green,  unread:true },
      { icon:"building", title:"Atualização de obra",          body:"Collegiate Uberaba 2 · 65% concluído.", time:"Ontem, 15:30",  bg:MA.blueXL,  ic:MA.blue,   unread:true },
      { icon:"trending", title:"Novo lançamento disponível",   body:"Collegiate Pouso Alegre 2 abre pré-venda.", time:"20 Out, 11:00", bg:MA.goldL,   ic:MA.goldD,  unread:false },
      { icon:"doc",      title:"Contrato atualizado",          body:"Adendo ao contrato Uberaba 2 disponível.", time:"15 Out, 08:45", bg:MA.blueXL,  ic:MA.blue,   unread:false },
      { icon:"calendar", title:"Vencimento se aproxima",       body:"Parcela de Nov/2024 vence em 05/11.", time:"12 Out, 10:00", bg:MA.redL,    ic:MA.red,    unread:false },
    ];
    return (
      <div style={{ flex:1, overflowY:"auto", backgroundColor:MA.bg }}>
        <div style={{ background:`linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding:"18px 18px 22px" }}>
          <div style={{ fontSize:18, fontWeight:800, color:MA.white, fontFamily:MFH }}>Notificações</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontFamily:MFB, marginTop:4 }}>2 não lidas</div>
        </div>
        <div style={{ padding:"12px 16px 20px" }}>
          {notifs.map((n,i) => (
            <div key={n.title} style={{ backgroundColor:MA.white, borderRadius:12, padding:"13px 14px", marginBottom:8, display:"flex", gap:12, border:`0.5px solid ${n.unread?MA.blue+"44":MA.border}`, position:"relative" }}>
              {n.unread && <div style={{ position:"absolute", top:12, right:14, width:7, height:7, borderRadius:"50%", backgroundColor:MA.blue }} />}
              <div style={{ width:36, height:36, borderRadius:10, backgroundColor:n.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <MIcon name={n.icon} size={15} color={n.ic} sw={1.5} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:MA.text, fontFamily:MFB, marginBottom:3 }}>{n.title}</div>
                <div style={{ fontSize:11, color:MA.textM, fontFamily:MFB, lineHeight:1.45, marginBottom:4 }}>{n.body}</div>
                <div style={{ fontSize:10, color:MA.textL, fontFamily:MFB }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── LOG DE ATIVIDADES ──
  function LogScreen() {
    const logs = [
      { icon:"trending", label:"Dividendos creditados",    val:"+R$ 412,45", date:"12 Out 2024", color:MA.green,  bg:MA.greenL },
      { icon:"doc",      label:"Contrato visualizado",     val:"Uberaba 2",  date:"10 Out 2024", color:MA.blue,   bg:MA.blueXL },
      { icon:"trending", label:"Aporte mensal processado", val:"+R$ 2.500",  date:"05 Out 2024", color:MA.green,  bg:MA.greenL },
      { icon:"calendar", label:"Parcela paga",             val:"Out/2024",   date:"05 Out 2024", color:MA.textM,  bg:MA.bg },
      { icon:"building", label:"Relatório de obra lido",   val:"Uberaba 2",  date:"02 Out 2024", color:MA.blue,   bg:MA.blueXL },
      { icon:"trending", label:"Dividendos creditados",    val:"+R$ 398,10", date:"12 Set 2024", color:MA.green,  bg:MA.greenL },
      { icon:"trending", label:"Aporte mensal processado", val:"+R$ 2.500",  date:"05 Set 2024", color:MA.green,  bg:MA.greenL },
    ];
    return (
      <div style={{ flex:1, overflowY:"auto", backgroundColor:MA.bg }}>
        <div style={{ background:`linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding:"18px 18px 22px" }}>
          <div style={{ fontSize:18, fontWeight:800, color:MA.white, fontFamily:MFH }}>Log de Atividades</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontFamily:MFB, marginTop:4 }}>Histórico completo de movimentações</div>
        </div>
        <div style={{ padding:"12px 16px 20px" }}>
          <div style={{ backgroundColor:MA.white, borderRadius:14, overflow:"hidden", border:`0.5px solid ${MA.border}` }}>
            {logs.map((l,i,arr) => (
              <div key={`${l.label}${i}`} style={{ padding:"12px 16px", display:"flex", alignItems:"center", gap:12, borderBottom:i<arr.length-1?`0.5px solid ${MA.border}`:"none" }}>
                <div style={{ width:34, height:34, borderRadius:10, backgroundColor:l.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <MIcon name={l.icon} size={14} color={l.color} sw={1.5} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:MA.text, fontFamily:MFB }}>{l.label}</div>
                  <div style={{ fontSize:10, color:MA.textL, fontFamily:MFB, marginTop:2 }}>{l.date}</div>
                </div>
                <div style={{ fontSize:11.5, fontWeight:700, color:l.color, fontFamily:MFB }}>{l.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── CHAT ──
  function ChatMenfeScreen() {
    const msgs = [
      { from:"menfe", text:"Olá, Ricardo! Como posso ajudar você hoje?",         time:"09:00" },
      { from:"user",  text:"Queria entender melhor os rendimentos do Uberaba 2.", time:"09:02" },
      { from:"menfe", text:"Claro! O Collegiate Uberaba 2 projeta rendimento de 0,8% a.m. sobre o valor investido a partir da entrega, prevista para Jun/2025. Posso te enviar a projeção detalhada?", time:"09:03" },
      { from:"user",  text:"Sim, por favor.",                                    time:"09:04" },
      { from:"menfe", text:"📎 Projeção_Uberaba2.pdf enviado. Qualquer dúvida estou aqui!", time:"09:05" },
    ];
    return (
      <div style={{ flex:1, display:"flex", flexDirection:"column", backgroundColor:MA.bg }}>
        <div style={{ background:`linear-gradient(160deg,${MA.navy},${MA.navyL})`, padding:"16px 18px 16px", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
          <div style={{ width:36, height:36, borderRadius:11, backgroundColor:`${MA.blue}44`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <MIcon name="chat" size={17} color={MA.white} sw={1.5} />
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:MA.white, fontFamily:MFH }}>Equipe Menfe</div>
            <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.4)", fontFamily:MFB }}>● Online agora</div>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
          {msgs.map((m,i) => (
            <div key={i} style={{ display:"flex", justifyContent:m.from==="user"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"80%", backgroundColor:m.from==="user"?MA.blue:MA.white, borderRadius:m.from==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px", padding:"10px 13px", border:m.from==="user"?"none":`0.5px solid ${MA.border}` }}>
                <div style={{ fontSize:12, color:m.from==="user"?MA.white:MA.text, fontFamily:MFB, lineHeight:1.5 }}>{m.text}</div>
                <div style={{ fontSize:9.5, color:m.from==="user"?"rgba(255,255,255,0.5)":MA.textL, fontFamily:MFB, marginTop:4, textAlign:"right" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:"10px 16px 14px", borderTop:`0.5px solid ${MA.border}`, backgroundColor:MA.white, display:"flex", gap:8, flexShrink:0 }}>
          <div style={{ flex:1, backgroundColor:MA.bg, borderRadius:22, padding:"10px 14px", fontSize:12, color:MA.textL, fontFamily:MFB }}>Escreva uma mensagem…</div>
          <div style={{ width:38, height:38, borderRadius:"50%", backgroundColor:MA.blue, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
            <MIcon name="chevronR" size={16} color={MA.white} sw={2} />
          </div>
        </div>
      </div>
    );
  }

  const screens = { home: <HomeScreen />, portfolio: <PortfolioScreen />, lancamentos: <LancamentosScreen />, financeiro: <FinanceiroScreen />, perfil: <PerfilScreen />, contratos: <ContratosScreen />, notificacoes: <NotificacoesScreen />, log: <LogScreen />, chat: <ChatMenfeScreen /> };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: `linear-gradient(155deg,${MA.navy} 0%,${MA.navyM} 40%,${MA.navyXL} 100%)`, padding: "24px 20px 36px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>
      <div style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: MFB }}>App do Investidor · Fase 1 · Protótipo Interativo</div>
      <div style={{ width: 320, backgroundColor: "#080808", borderRadius: 50, padding: "12px 6px 16px", boxShadow: `0 50px 110px rgba(0,0,0,0.65),0 0 0 1px rgba(255,255,255,0.04),0 0 90px ${MA.blue}1A` }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
          <div style={{ width: 92, height: 26, backgroundColor: "#040404", borderRadius: 14 }} />
        </div>
        <div style={{ borderRadius: 36, overflow: "hidden", height: 622, backgroundColor: MA.bg, display: "flex", flexDirection: "column" }}>
          {!onboarded ? <LoginScreen /> : screens[screen]}
          {onboarded && <NavBar />}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <div style={{ width: 80, height: 3.5, backgroundColor: "rgba(255,255,255,0.16)", borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        <div onClick={() => setOnboarded(false)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: MFB, backgroundColor: !onboarded ? MA.blue : "rgba(255,255,255,0.07)", color: !onboarded ? MA.white : "rgba(255,255,255,0.45)", border: `1px solid ${!onboarded ? MA.blue : "rgba(255,255,255,0.09)"}` }}>Login</div>
        {[{ k: "home", l: "Home" }, { k: "lancamentos", l: "Lançamentos" }, { k: "portfolio", l: "Portfólio" }, { k: "financeiro", l: "Financeiro" }, { k: "contratos", l: "Contratos" }, { k: "notificacoes", l: "Notificações" }, { k: "log", l: "Log" }, { k: "chat", l: "Chat" }, { k: "perfil", l: "Perfil" }].map(t => (
          <div key={t.k} onClick={() => { setOnboarded(true); setScreen(t.k); setDetail(null); }} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: MFB, backgroundColor: onboarded && screen === t.k ? MA.blue : "rgba(255,255,255,0.07)", color: onboarded && screen === t.k ? MA.white : "rgba(255,255,255,0.45)", border: `1px solid ${onboarded && screen === t.k ? MA.blue : "rgba(255,255,255,0.09)"}` }}>{t.l}</div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROTOTYPE: APP COLLEGIATE · MORADOR  (v2 — premium redesign)
// ═══════════════════════════════════════════════════════════════════════════════

// ── Collegiate design tokens ──
const T = {
  orange:"#E85D26", orangeD:"#C44A18", orangeL:"#FEF0EB", orangeM:"#F97A4A",
  dark:"#1A0E06", darkM:"#2D1A0A", darkL:"#3D2412",
  cream:"#FAF7F2", sand:"#F0EBE2", sandM:"#E8DFD0",
  text:"#1A0E06", textM:"#5C4A3A", textL:"#9C8878",
  tborder:"rgba(26,14,6,0.08)",
  tgreen:"#2D7A4F", tgreenL:"#E6F4EE",
};
const FD = "'Playfair Display','Georgia',serif";
const FB = "'DM Sans','Segoe UI',sans-serif";

const EMPREEN = [
  { id:1, name:"Collegiate Uberaba 2",      city:"Uberaba",          state:"MG", tipo:"Studio · 24m²", preco:1800, status:"Lançamento",  rating:4.9, reviews:"2.4k", desc:"Localização privilegiada no centro da cidade. Wi-Fi Giga, rooftop panorâmico e academia 24h. Ideal para estadias de curta ou média duração.", tags:["Wi-Fi Giga","Rooftop","Academia","Coworking"], perfil:["executivo","viajante"], orcamento:"medio",    lifestyle:["social","fitness"],  gradient:"linear-gradient(160deg,#1A2E4A,#2A4A6A)", emoji:"🏙" },
  { id:2, name:"Collegiate Varginha",        city:"Varginha",         state:"MG", tipo:"Studio · 28m²", preco:1600, status:"95% Vendido", rating:4.8, reviews:"1.8k", desc:"256 unidades modernas com coworking, academia e localização central. Perfeito para quem busca flexibilidade e conforto.", tags:["Coworking","Fitness","Central"],                perfil:["executivo","viajante"],  orcamento:"acessivel", lifestyle:["trabalho","fitness"], gradient:"linear-gradient(160deg,#2D1A4A,#4A2D7A)", emoji:"🌿" },
  { id:3, name:"Collegiate Plus São João del-Rei", city:"São João del-Rei", state:"MG", tipo:"1 Quarto · 38m²", preco:2200, status:"Em obras", rating:4.9, reviews:"3.1k", desc:"84 unidades premium com rooftop de alto nível, área gourmet e hidromassagem. Experiência de hospedagem sofisticada.", tags:["Gourmet","Hidromassagem","Rooftop","Premium"],  perfil:["premium","casal"],  orcamento:"premium",  lifestyle:["social","gourmet"],  gradient:"linear-gradient(160deg,#1A3A2E,#2D5A46)", emoji:"✨" },
  { id:4, name:"Collegiate ONE Barbacena",   city:"Barbacena",        state:"MG", tipo:"Studio · 22m²", preco:1500, status:"100% Vendido",rating:4.7, reviews:"2.9k", desc:"160 apartamentos compactos com ótima localização, próximos ao centro comercial. Solução prática e bem-localizada.", tags:["Localização","Academia","Coworking"],              perfil:["executivo","viajante"],        orcamento:"acessivel", lifestyle:["trabalho","fitness"],  gradient:"linear-gradient(160deg,#3A1A1A,#6A2A2A)", emoji:"🏥" },
  { id:5, name:"Collegiate Barbacena",       city:"Barbacena",        state:"MG", tipo:"Studio · 32m²", preco:1900, status:"Entregue",    rating:4.9, reviews:"4.2k", desc:"204 unidades com áreas compartilhadas modernas. Conforto e praticidade para estadias flexíveis.", tags:["Compartilhado","Moderno","Flexível"],          perfil:["executivo","viajante"], orcamento:"medio", lifestyle:["social","trabalho"],   gradient:"linear-gradient(160deg,#1A2A1A,#2A4A2A)", emoji:"🌳" },
];

const STEPS_A = [
  { id:"perfil",  pergunta:"Qual é o seu perfil?",             sub:"Isso nos ajuda a entender suas necessidades",          icon:"👋", tipo:"opcoes", opcoes:[{label:"Executivo / Negócios",value:"executivo",icon:"💼"},{label:"Viajante frequente",value:"viajante",icon:"✈️"},{label:"Nômade digital",value:"nomade",icon:"💻"},{label:"Casal / família",value:"casal",icon:"💑"}] },
  { id:"cidade",  pergunta:"Qual região te interessa?",        sub:"Temos empreendimentos em cidades estratégicas de MG",  icon:"📍", tipo:"opcoes", opcoes:[{label:"Triângulo Mineiro",value:"triangulo",icon:"🌄"},{label:"Sul de Minas",value:"sul",icon:"🌿"},{label:"Campo das Vertentes",value:"vertentes",icon:"🏘"},{label:"Indiferente",value:"qualquer",icon:"🗺"}] },
  { id:"orcamento",pergunta:"Qual é o seu orçamento mensal?",  sub:"Valores incluem hospedagem e serviços",                icon:"💰", tipo:"opcoes", opcoes:[{label:"Até R$ 1.600",value:"acessivel",icon:"✅"},{label:"R$ 1.600 – R$ 2.000",value:"medio",icon:"⭐"},{label:"R$ 2.000 – R$ 2.500",value:"premium",icon:"💎"},{label:"Acima de R$ 2.500",value:"luxo",icon:"👑"}] },
  { id:"lifestyle",pergunta:"O que você prioriza na hospedagem?", sub:"Selecione até 2 opções que mais combinam com você", icon:"🌟", tipo:"multi", max:2, opcoes:[{label:"Vida social",value:"social",icon:"🥂"},{label:"Foco no trabalho",value:"trabalho",icon:"💻"},{label:"Fitness e saúde",value:"fitness",icon:"🏋️"},{label:"Coworking",value:"cowork",icon:"🖥"},{label:"Gastronomia",value:"gourmet",icon:"🍽"},{label:"Tranquilidade",value:"calmo",icon:"🧘"}] },
  { id:"prazo",   pergunta:"Quando pretende se hospedar?",     sub:"Define quais empreendimentos estão disponíveis",       icon:"📅", tipo:"opcoes", opcoes:[{label:"Imediatamente",value:"agora",icon:"⚡"},{label:"Em até 1 mês",value:"1mes",icon:"📆"},{label:"Em até 3 meses",value:"3meses",icon:"🗓"},{label:"Ainda avaliando",value:"avaliando",icon:"🤔"}] },
];

function CBlob({colors,style}){return <div style={{position:"absolute",borderRadius:"50%",filter:"blur(40px)",opacity:0.35,pointerEvents:"none",...style,background:`radial-gradient(ellipse,${colors[0]},${colors[1]})`}}/>;}
function CTag({children,active,onClick}){return <div onClick={onClick} style={{padding:"6px 14px",borderRadius:20,fontSize:11.5,fontWeight:600,whiteSpace:"nowrap",cursor:onClick?"pointer":"default",backgroundColor:active?T.orange:"#fff",color:active?"#fff":T.textM,border:`1.5px solid ${active?T.orange:T.tborder}`,transition:"all 0.18s",boxShadow:active?`0 4px 12px ${T.orange}44`:"none",fontFamily:FB}}>{children}</div>;}
function CStars({n=5}){return <span style={{color:"#F59E0B",fontSize:10}}>{"★".repeat(Math.round(n))}{"☆".repeat(5-Math.round(n))}</span>;}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: APP DO INQUILINO · FASE 2 — ÁREA LOGADA
// ═══════════════════════════════════════════════════════════════════════════════
function PagePrototypeLeadsApp() {
  const [appPhase, setAppPhase] = useState("splash");
  const [screen, setScreen]     = useState("vitrine");
  const [astStep, setAstStep]   = useState(-1);
  const [astRes, setAstRes]     = useState({});
  const [astResult, setAstResult] = useState(null);
  const [astAnim, setAstAnim]   = useState(true);

  function astAvancar(id, valor){
    const novas={...astRes,[id]:valor};
    setAstRes(novas);
    if(astStep<STEPS_A.length-1){
      setAstAnim(false);
      setTimeout(()=>{setAstStep(s=>s+1);setAstAnim(true);},200);
    } else {
      const matches=EMPREEN.map(em=>{
        let score=0;
        if(novas.perfil&&em.perfil.includes(novas.perfil)) score+=3;
        if(novas.orcamento===em.orcamento) score+=3;
        const ls=Array.isArray(novas.lifestyle)?novas.lifestyle:[novas.lifestyle].filter(Boolean);
        ls.forEach(l=>{if(em.lifestyle.includes(l)) score+=2;});
        return {...em,score};
      }).sort((a,b)=>b.score-a.score);
      setAstResult(matches.slice(0,3));
    }
  }
  function astToggleMulti(id,valor){
    const atual=Array.isArray(astRes[id])?astRes[id]:[];
    const sd=STEPS_A[astStep];
    if(atual.includes(valor)){setAstRes(r=>({...r,[id]:atual.filter(v=>v!==valor)}));}
    else if(atual.length<(sd.max||99)){
      const novo=[...atual,valor];
      setAstRes(r=>({...r,[id]:novo}));
      if(novo.length===sd.max) setTimeout(()=>astAvancar(id,novo),300);
    }
  }
  function astReset(){setAstStep(-1);setAstRes({});setAstResult(null);}

  function SBar(){
    return(
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px 4px",flexShrink:0}}>
        <span style={{fontSize:11,fontWeight:700,color:T.text,fontFamily:FB}}>9:41</span>
        <div style={{width:80,height:22,backgroundColor:"rgba(0,0,0,0.9)",borderRadius:12}}/>
        <span style={{fontSize:9,color:T.text,fontFamily:FB}}>●●● 67</span>
      </div>
    );
  }

  function NavBar(){
    const tabs=[{k:"vitrine",icon:"⌂",label:"Início"},{k:"assistente",icon:"✦",label:"Buscar lar"},{k:"explorar",icon:"◎",label:"Explorar"},{k:"entrar",icon:"○",label:"Entrar"}];
    return(
      <div style={{flexShrink:0,padding:"8px 10px 14px",background:T.dark,display:"flex",gap:4}}>
        <div style={{flex:1,display:"flex",backgroundColor:"rgba(255,255,255,0.07)",borderRadius:22,padding:"4px"}}>
          {tabs.map(t=>{
            const a=screen===t.k;
            return(
              <div key={t.k} onClick={()=>setScreen(t.k)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"6px 4px",borderRadius:18,backgroundColor:a?T.orange:"transparent",transition:"all 0.2s"}}>
                <span style={{fontSize:15,color:a?"#fff":"rgba(255,255,255,0.4)",lineHeight:1}}>{t.icon}</span>
                <span style={{fontSize:8.5,fontWeight:a?700:500,color:a?"#fff":"rgba(255,255,255,0.3)",fontFamily:FB}}>{t.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function SplashScreen(){
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#0D2A1A,#1A3A2A,#2A1A0A)"}}>
        <CBlob colors={[T.orange,T.orangeD]} style={{width:280,height:280,top:-80,right:-80,opacity:0.2}}/>
        <CBlob colors={["#1E4E9C","#0A2A5C"]} style={{width:220,height:220,bottom:100,left:-60,opacity:0.2}}/>
        <SBar/>
        <div style={{position:"relative",flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 26px 44px"}}>
          <div style={{position:"absolute",top:10,left:26,display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:30,height:30,borderRadius:9,background:T.orange,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#fff",fontFamily:FB}}>C</div>
            <span style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:FB}}>collegiate.</span>
          </div>
          <div style={{fontSize:32,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.15,marginBottom:12,letterSpacing:"-0.5px"}}>
            Descubra onde<br/><span style={{color:T.orangeM}}>você quer morar.</span>
          </div>
          <div style={{fontSize:12.5,color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:30,fontFamily:FB}}>
            Explore empreendimentos, encontre a acomodação ideal e viva a experiência Collegiate.
          </div>
          <div onClick={()=>setAppPhase("app")} style={{background:T.orange,borderRadius:16,padding:"15px",textAlign:"center",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB,boxShadow:`0 8px 32px ${T.orange}66`,marginBottom:10}}>
            Explorar empreendimentos →
          </div>
          <div style={{textAlign:"center",fontSize:11.5,color:"rgba(255,255,255,0.3)",fontFamily:FB}}>
            Já tem reserva? <span style={{color:T.orangeM,fontWeight:600,cursor:"pointer"}} onClick={()=>{setAppPhase("app");setScreen("entrar");}}>Entrar na conta</span>
          </div>
        </div>
      </div>
    );
  }

  function VitrineScreen(){
    const [catAtiva,setCatAtiva]=useState("Todos");
    const [det,setDet]=useState(null);
    const cats=["Todos","Disponível","Em obras"];
    const filtrados=catAtiva==="Todos"?EMPREEN:catAtiva==="Disponível"?EMPREEN.filter(e=>e.status==="Entregue"||e.status==="Lançamento"):EMPREEN.filter(e=>e.status.includes("obras"));

    if(det!==null){
      const em=EMPREEN.find(e=>e.id===det);
      return(
        <div style={{flex:1,overflowY:"auto",backgroundColor:"#fff"}}>
          <div style={{height:230,background:em.gradient,position:"relative"}}>
            <SBar/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(26,14,6,0.8) 0%,transparent 55%)"}}/>
            <div style={{position:"absolute",top:52,left:14}}>
              <div onClick={()=>setDet(null)} style={{width:34,height:34,borderRadius:10,backgroundColor:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:"#fff",cursor:"pointer"}}>←</div>
            </div>
            <div style={{position:"absolute",bottom:16,left:18,right:18}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",fontFamily:FB,marginBottom:4}}>{em.emoji} {em.city.toUpperCase()}, {em.state}</div>
              <div style={{fontSize:22,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2,letterSpacing:"-0.3px"}}>{em.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                <CStars n={em.rating}/>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontFamily:FB}}>{em.rating} ({em.reviews})</span>
              </div>
            </div>
          </div>
          <div style={{padding:"16px 18px"}}>
            <div style={{backgroundColor:T.orangeL,borderRadius:14,padding:"12px 16px",marginBottom:14}}>
              <div style={{fontSize:11,color:T.textL,fontFamily:FB,marginBottom:2}}>A partir de</div>
              <div style={{fontSize:22,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {em.preco.toLocaleString()}<span style={{fontSize:12,color:T.textL}}>/mês</span></div>
            </div>
            <div style={{fontSize:13,color:T.textM,lineHeight:1.75,fontFamily:FB,marginBottom:14}}>{em.desc}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
              {["🛏 Mobiliado","📶 Wi-Fi Giga","🏋️ Academia 24h","💼 Coworking","🧺 Lavanderia"].map(a=>(
                <div key={a} style={{display:"flex",alignItems:"center",gap:7,backgroundColor:T.sand,borderRadius:10,padding:"9px 11px"}}>
                  <span style={{fontSize:14}}>{a.split(" ")[0]}</span>
                  <span style={{fontSize:11,color:T.textM,fontWeight:600,fontFamily:FB}}>{a.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
              {em.tags.map(tg=><span key={tg} style={{backgroundColor:T.orangeL,color:T.orangeD,borderRadius:7,padding:"4px 10px",fontSize:11,fontWeight:700,fontFamily:FB}}>{tg}</span>)}
            </div>
          </div>
          <div style={{position:"sticky",bottom:0,backgroundColor:"#fff",padding:"12px 18px 18px",borderTop:`1px solid ${T.tborder}`,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 -8px 28px rgba(26,14,6,0.07)"}}>
            <div>
              <div style={{fontSize:11,color:T.textL,fontFamily:FB}}>A partir de</div>
              <div style={{fontSize:20,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {em.preco.toLocaleString()}<span style={{fontSize:11,color:T.textL}}>/mês</span></div>
            </div>
            <div onClick={()=>setScreen("entrar")} style={{backgroundColor:T.orange,borderRadius:14,padding:"13px 22px",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB,boxShadow:`0 8px 24px ${T.orange}55`}}>Quero morar aqui →</div>
          </div>
        </div>
      );
    }

    return(
      <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
        <div style={{background:T.dark,padding:"0 18px 18px",position:"relative",overflow:"hidden"}}>
          <SBar/>
          <CBlob colors={[T.orange,T.orangeD]} style={{width:180,height:180,top:-70,right:-50,opacity:0.2}}/>
          <div style={{position:"relative"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{fontSize:10.5,color:"rgba(255,255,255,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:4}}>Encontre seu lar</div>
                <div style={{fontSize:20,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2,letterSpacing:"-0.3px"}}>Explore o<br/><span style={{color:T.orangeM}}>Collegiate</span></div>
              </div>
              <div style={{backgroundColor:"rgba(255,255,255,0.08)",borderRadius:12,padding:"8px 12px",textAlign:"center",border:"1px solid rgba(255,255,255,0.1)"}}>
                <div style={{fontSize:18}}>☀️</div>
                <div style={{fontSize:9.5,color:"rgba(255,255,255,0.6)",fontWeight:700,fontFamily:FB}}>26°C</div>
              </div>
            </div>
            <div style={{backgroundColor:"rgba(255,255,255,0.09)",borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,0.08)"}}>
              <span style={{fontSize:14,opacity:0.5}}>🔍</span>
              <span style={{fontSize:12,color:"rgba(255,255,255,0.35)",fontFamily:FB}}>Buscar por cidade ou empreendimento…</span>
            </div>
          </div>
        </div>
        <div style={{padding:"12px 18px 0",display:"flex",gap:7,overflowX:"auto"}}>
          {cats.map(c=><CTag key={c} active={catAtiva===c} onClick={()=>setCatAtiva(c)}>{c}</CTag>)}
        </div>
        <div style={{padding:"14px 18px 0"}}>
          <div onClick={()=>setDet(1)} style={{borderRadius:22,overflow:"hidden",cursor:"pointer",boxShadow:"0 16px 48px rgba(26,14,6,0.15)"}}>
            <div style={{height:200,background:EMPREEN[0].gradient,position:"relative",display:"flex",alignItems:"flex-end",padding:"12px 16px"}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(26,14,6,0.75) 0%,transparent 55%)"}}/>
              <div style={{position:"absolute",top:12,left:14}}><span style={{backgroundColor:T.orange,borderRadius:7,padding:"4px 10px",fontSize:9.5,fontWeight:700,color:"#fff",fontFamily:FB}}>✦ LANÇAMENTO</span></div>
              <div style={{position:"absolute",top:12,right:14}}>
                <div style={{backgroundColor:"rgba(255,255,255,0.15)",borderRadius:9,padding:"4px 9px",display:"flex",alignItems:"center",gap:4,backdropFilter:"blur(8px)"}}>
                  <span style={{fontSize:10}}>⭐</span><span style={{fontSize:11,fontWeight:700,color:"#fff",fontFamily:FB}}>{EMPREEN[0].reviews}</span>
                </div>
              </div>
              <div style={{position:"relative"}}>
                <div style={{fontSize:20,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2}}>{EMPREEN[0].name}</div>
                <div style={{fontSize:11.5,color:"rgba(255,255,255,0.65)",fontFamily:FB,marginTop:2}}>📍 {EMPREEN[0].city}, {EMPREEN[0].state} · {EMPREEN[0].tipo}</div>
              </div>
            </div>
            <div style={{backgroundColor:"#fff",padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:11,color:T.textL,fontFamily:FB}}>A partir de</div>
                <div style={{fontSize:19,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {EMPREEN[0].preco.toLocaleString()}<span style={{fontSize:11,color:T.textL}}>/mês</span></div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4,maxWidth:150}}>
                {EMPREEN[0].tags.slice(0,3).map(tg=><span key={tg} style={{fontSize:9.5,backgroundColor:T.orangeL,color:T.orangeD,padding:"3px 7px",borderRadius:5,fontWeight:600,fontFamily:FB}}>{tg}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div style={{padding:"16px 18px 0"}}>
          <div style={{fontSize:10.5,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:FB,marginBottom:10}}>Todos os empreendimentos</div>
          {filtrados.map(em=>(
            <div key={em.id} onClick={()=>setDet(em.id)} style={{backgroundColor:"#fff",borderRadius:18,marginBottom:11,overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 18px rgba(26,14,6,0.07)",border:`1px solid ${T.tborder}`}}>
              <div style={{height:72,background:em.gradient,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                <span style={{fontSize:28}}>{em.emoji}</span>
                <div style={{position:"absolute",top:9,right:10}}>
                  <span style={{backgroundColor:em.status==="Lançamento"?T.orange:em.status.includes("100%")?"#777":T.dark,borderRadius:6,padding:"3px 8px",fontSize:9,fontWeight:700,color:"#fff",fontFamily:FB}}>{em.status}</span>
                </div>
              </div>
              <div style={{padding:"11px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                  <div style={{fontSize:13.5,fontWeight:700,color:T.text,fontFamily:FD}}>{em.name}</div>
                  <div style={{backgroundColor:T.orangeL,borderRadius:7,padding:"3px 7px",display:"flex",alignItems:"center",gap:2}}>
                    <span style={{fontSize:9}}>⭐</span><span style={{fontSize:10.5,fontWeight:700,color:T.orangeD,fontFamily:FB}}>{em.rating}</span>
                  </div>
                </div>
                <div style={{fontSize:11,color:T.textL,fontFamily:FB,marginBottom:7}}>📍 {em.city}, {em.state} · {em.tipo}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:15,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {em.preco.toLocaleString()}<span style={{fontSize:10,fontWeight:500,color:T.textL}}>/mês</span></div>
                  <div style={{display:"flex",gap:4}}>
                    {em.tags.slice(0,2).map(tg=><span key={tg} style={{fontSize:9.5,backgroundColor:T.sand,color:T.textM,padding:"3px 7px",borderRadius:5,fontWeight:600,fontFamily:FB}}>{tg}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div onClick={()=>setScreen("assistente")} style={{background:T.dark,borderRadius:20,padding:"18px 20px",marginBottom:22,cursor:"pointer",position:"relative",overflow:"hidden"}}>
            <CBlob colors={[T.orange,T.orangeD]} style={{width:140,height:140,top:-40,right:-30,opacity:0.3}}/>
            <div style={{position:"relative"}}>
              <div style={{fontSize:10.5,color:T.orangeM,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:5}}>✦ Assistente Collegiate</div>
              <div style={{fontSize:16,fontWeight:800,color:"#fff",fontFamily:FD,marginBottom:5,lineHeight:1.3}}>Não sabe por onde começar?</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontFamily:FB,marginBottom:13,lineHeight:1.6}}>Responda 5 perguntas e deixe o Collegiate encontrar a acomodação perfeita para você.</div>
              <div style={{backgroundColor:T.orange,borderRadius:10,padding:"9px 16px",display:"inline-block",fontSize:12,fontWeight:700,color:"#fff",fontFamily:FB}}>Encontrar meu lar →</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function AssistenteScreen(){
    const stepData=STEPS_A[astStep];
    const progress=astStep<0?0:((astStep+1)/STEPS_A.length)*100;
    if(astResult){
      return(
        <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream,padding:"0 18px 24px"}}>
          <SBar/>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10.5,color:T.orange,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:5}}>✦ Resultado personalizado</div>
            <div style={{fontSize:20,fontWeight:800,color:T.text,fontFamily:FD,marginBottom:3}}>Encontramos {astResult.length} opções para você</div>
            <div style={{fontSize:12,color:T.textL,fontFamily:FB}}>Baseado no seu perfil e preferências</div>
          </div>
          {astResult.map((em,i)=>(
            <div key={em.id} style={{backgroundColor:"#fff",borderRadius:18,marginBottom:11,overflow:"hidden",boxShadow:i===0?"0 8px 28px rgba(26,14,6,0.12)":"0 4px 14px rgba(26,14,6,0.06)",border:i===0?`2px solid ${T.orange}`:`1px solid ${T.tborder}`}}>
              <div style={{height:90,background:em.gradient,position:"relative",display:"flex",alignItems:"flex-end",padding:"10px 14px"}}>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(26,14,6,0.7) 0%,transparent 50%)"}}/>
                {i===0&&<div style={{position:"absolute",top:10,left:12}}><span style={{backgroundColor:T.orange,borderRadius:6,padding:"3px 9px",fontSize:9,fontWeight:700,color:"#fff",fontFamily:FB}}>✦ Melhor escolha</span></div>}
                <div style={{position:"relative"}}>
                  <div style={{fontSize:14,fontWeight:800,color:"#fff",fontFamily:FD}}>{em.name}</div>
                  <div style={{fontSize:10.5,color:"rgba(255,255,255,0.6)",fontFamily:FB}}>📍 {em.city}, {em.state}</div>
                </div>
              </div>
              <div style={{padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:15,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {em.preco.toLocaleString()}<span style={{fontSize:10,fontWeight:500,color:T.textL}}>/mês</span></div>
                <div style={{backgroundColor:T.orange,borderRadius:9,padding:"7px 14px",fontSize:11,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB}}>Ver detalhes →</div>
              </div>
            </div>
          ))}
          <div onClick={astReset} style={{marginTop:8,border:`1.5px solid ${T.tborder}`,borderRadius:14,padding:"12px",textAlign:"center",fontSize:12,fontWeight:700,color:T.textM,cursor:"pointer",fontFamily:FB}}>Refazer busca</div>
        </div>
      );
    }
    if(astStep<0){
      return(
        <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
          <div style={{background:T.dark,padding:"0 18px 22px",position:"relative",overflow:"hidden"}}>
            <CBlob colors={[T.orange,T.orangeD]} style={{width:180,height:180,top:-70,right:-50,opacity:0.25}}/>
            <SBar/>
            <div style={{position:"relative"}}>
              <div style={{fontSize:10.5,color:T.orangeM,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:6}}>✦ Assistente Collegiate</div>
              <div style={{fontSize:22,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2,marginBottom:5,letterSpacing:"-0.3px"}}>Vamos encontrar<br/>seu lar ideal</div>
            </div>
          </div>
          <div style={{padding:"16px 18px"}}>
            <div style={{fontSize:13,color:T.textM,lineHeight:1.75,fontFamily:FB,marginBottom:26}}>Responda 5 perguntas rápidas e eu vou encontrar a acomodação Collegiate perfeita para o seu perfil, orçamento e estilo de vida.</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:24}}>
              {["Executivo/Negócios","Nômade digital","Até R$ 2.000/mês","Sul de Minas"].map(s=>(
                <div key={s} style={{backgroundColor:"#fff",borderRadius:20,padding:"6px 13px",fontSize:11.5,fontWeight:600,color:T.textM,cursor:"pointer",border:`1.5px solid ${T.tborder}`,fontFamily:FB}}>{s}</div>
              ))}
            </div>
            <div onClick={()=>{setAstStep(0);setAstAnim(true);}} style={{background:T.orange,borderRadius:16,padding:"15px",textAlign:"center",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB,boxShadow:`0 10px 32px ${T.orange}55`}}>Começar agora ✦</div>
          </div>
        </div>
      );
    }
    const isMulti=stepData.tipo==="multi";
    const selecionados=isMulti?(Array.isArray(astRes[stepData.id])?astRes[stepData.id]:[]):astRes[stepData.id];
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",backgroundColor:T.cream,overflow:"hidden"}}>
        <SBar/>
        <div style={{padding:"0 18px 12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <div onClick={()=>setAstStep(s=>Math.max(-1,s-1))} style={{fontSize:11.5,color:T.textL,cursor:"pointer",fontFamily:FB,fontWeight:600}}>← Voltar</div>
            <div style={{fontSize:11.5,color:T.textL,fontFamily:FB,fontWeight:600}}>{astStep+1} de {STEPS_A.length}</div>
          </div>
          <div style={{height:4,backgroundColor:T.sandM,borderRadius:2,overflow:"hidden"}}>
            <div style={{width:`${progress}%`,height:"100%",background:T.orange,borderRadius:2,transition:"width 0.4s ease"}}/>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"4px 18px 24px",opacity:astAnim?1:0,transform:`translateY(${astAnim?0:12}px)`,transition:"all 0.2s ease"}}>
          <div style={{marginBottom:22}}>
            <div style={{fontSize:26,marginBottom:10}}>{stepData.icon}</div>
            <div style={{fontSize:20,fontWeight:800,color:T.text,fontFamily:FD,lineHeight:1.25,marginBottom:5,letterSpacing:"-0.3px"}}>{stepData.pergunta}</div>
            <div style={{fontSize:12.5,color:T.textL,fontFamily:FB,lineHeight:1.6}}>{stepData.sub}{isMulti?` (máx. ${stepData.max})`:""}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {stepData.opcoes.map(op=>{
              const sel=isMulti?selecionados.includes(op.value):selecionados===op.value;
              return(
                <div key={op.value} onClick={()=>isMulti?astToggleMulti(stepData.id,op.value):astAvancar(stepData.id,op.value)} style={{backgroundColor:sel?T.dark:"#fff",borderRadius:16,padding:"13px 15px",display:"flex",alignItems:"center",gap:13,cursor:"pointer",transition:"all 0.18s",border:`2px solid ${sel?T.orange:T.tborder}`,boxShadow:sel?`0 6px 22px ${T.orange}33`:"0 2px 8px rgba(26,14,6,0.05)"}}>
                  <div style={{width:40,height:40,borderRadius:12,flexShrink:0,background:sel?T.orange:T.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,transition:"all 0.18s"}}>{op.icon}</div>
                  <span style={{fontSize:13.5,fontWeight:600,fontFamily:FB,color:sel?"#fff":T.text}}>{op.label}</span>
                  {sel&&<div style={{marginLeft:"auto",width:20,height:20,borderRadius:"50%",backgroundColor:T.orange,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,color:"#fff",fontWeight:800}}>✓</span></div>}
                </div>
              );
            })}
          </div>
          {isMulti&&selecionados.length>0&&selecionados.length<stepData.max&&(
            <div onClick={()=>astAvancar(stepData.id,selecionados)} style={{marginTop:14,backgroundColor:T.orange,borderRadius:14,padding:"13px",textAlign:"center",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB}}>Continuar →</div>
          )}
        </div>
      </div>
    );
  }

  function EntrarScreen(){
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",backgroundColor:T.cream}}>
        <SBar/>
        <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"20px 26px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:28}}>
            <div style={{width:38,height:38,borderRadius:12,background:T.orange,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#fff",fontFamily:FB}}>C</div>
            <div>
              <div style={{fontSize:16,fontWeight:800,color:T.text,fontFamily:FD,letterSpacing:"-0.3px"}}>collegiate.</div>
              <div style={{fontSize:10,color:T.textL,fontFamily:FB}}>Área do Hóspede</div>
            </div>
          </div>
          <div style={{fontSize:22,fontWeight:800,color:T.text,fontFamily:FD,marginBottom:4,letterSpacing:"-0.3px"}}>Bem-vindo de volta</div>
          <div style={{fontSize:13,color:T.textL,fontFamily:FB,marginBottom:26,lineHeight:1.5}}>Entre com seus dados para acessar a área do hóspede.</div>
          <div style={{fontSize:10.5,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:6}}>CPF ou e-mail</div>
          <div style={{backgroundColor:"#fff",borderRadius:13,padding:"12px 15px",marginBottom:11,border:`1.5px solid ${T.tborder}`,fontSize:13,color:T.textL,fontFamily:FB}}>000.000.000-00</div>
          <div style={{fontSize:10.5,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:6}}>Senha</div>
          <div style={{backgroundColor:"#fff",borderRadius:13,padding:"12px 15px",marginBottom:22,border:`1.5px solid ${T.tborder}`,fontSize:13,color:T.textL,fontFamily:FB}}>••••••••</div>
          <div style={{background:`${T.orange}55`,borderRadius:15,padding:"14px",textAlign:"center",fontSize:14,fontWeight:700,color:"#fff",fontFamily:FB,cursor:"default"}}>Entrar</div>
          <div style={{marginTop:14,padding:"12px 14px",backgroundColor:"#FEF3C7",borderRadius:12,border:"1px solid #FCD34D",textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#92400E",fontFamily:FB,marginBottom:3}}>⚠️ Protótipo · Fase 3</div>
            <div style={{fontSize:10.5,color:"#78350F",fontFamily:FB,lineHeight:1.5}}>Esta é a área deslogada (F3 · App de Leads). O login e a área do hóspede são exclusivos da <strong>Fase 2</strong>.</div>
          </div>
          <div onClick={()=>setScreen("vitrine")} style={{marginTop:12,padding:"10px 14px",backgroundColor:`${T.orange}11`,borderRadius:12,border:`1px solid ${T.orange}33`,textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:12,fontWeight:600,color:T.orange,fontFamily:FB}}>← Voltar para a vitrine pública</div>
          </div>
        </div>
      </div>
    );
  }

  let currentScreen;
  if(appPhase==="splash"){
    currentScreen=<SplashScreen/>;
  } else {
    const s={vitrine:<VitrineScreen/>,assistente:<AssistenteScreen/>,explorar:<VitrineScreen/>,entrar:<EntrarScreen/>};
    currentScreen=s[screen]||<VitrineScreen/>;
  }

  const showNav=appPhase!=="splash";

  return(
    <div style={{flex:1,overflowY:"auto",background:"linear-gradient(160deg,#1A1A1A,#2A1A0A)",padding:"24px 20px 36px",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap'); ::-webkit-scrollbar{display:none}`}</style>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{padding:"4px 12px",borderRadius:20,backgroundColor:"rgba(232,93,38,0.2)",border:"1px solid rgba(232,93,38,0.4)",fontSize:10,fontWeight:700,color:T.orange,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:FB}}>Fase 3</div>
        <div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.35)",fontFamily:FB}}>App de Leads · Área Deslogada</div>
      </div>
      <div style={{maxWidth:340,backgroundColor:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"10px 14px",textAlign:"center"}}>
        <div style={{fontSize:10.5,color:"rgba(255,255,255,0.5)",fontFamily:FB,lineHeight:1.6}}>🌐 Fluxo: Splash → Vitrine pública → Busca → Assistente → Detalhe do imóvel</div>
      </div>
      <div style={{width:340,background:"#111",borderRadius:50,padding:"13px 7px 17px",boxShadow:`0 50px 110px rgba(0,0,0,0.65),0 0 0 1px rgba(255,255,255,0.06),0 0 70px ${T.orange}22`}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:5}}>
          <div style={{width:100,height:28,backgroundColor:"#0A0A0A",borderRadius:16}}/>
        </div>
        <div style={{borderRadius:38,overflow:"hidden",height:640,backgroundColor:T.cream,display:"flex",flexDirection:"column"}}>
          {currentScreen}
          {showNav&&<NavBar/>}
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:10}}>
          <div style={{width:90,height:4,backgroundColor:"rgba(255,255,255,0.2)",borderRadius:2}}/>
        </div>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",maxWidth:440}}>
        {[
          {l:"🌟 Splash",    fn:()=>{setAppPhase("splash");}},
          {l:"🏠 Vitrine",   fn:()=>{setAppPhase("app");setScreen("vitrine");}},
          {l:"✦ Assistente", fn:()=>{setAppPhase("app");setScreen("assistente");setAstStep(-1);}},
          {l:"◎ Explorar",   fn:()=>{setAppPhase("app");setScreen("explorar");}},
          {l:"○ Entrar",     fn:()=>{setAppPhase("app");setScreen("entrar");}},
        ].map(t=>(
          <div key={t.l} onClick={t.fn} style={{backgroundColor:"rgba(255,255,255,0.07)",borderRadius:20,padding:"6px 14px",fontSize:11,fontWeight:600,cursor:"pointer",color:"rgba(255,255,255,0.55)",fontFamily:FB,border:"1px solid rgba(255,255,255,0.09)",transition:"all 0.15s"}}>{t.l}</div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: APP DO INQUILINO · FASE 2 — ÁREA LOGADA
// ═══════════════════════════════════════════════════════════════════════════════
function PagePrototypeCollegiate({ startLoggedIn = false }) {
  const [appPhase, setAppPhase]   = useState(startLoggedIn ? "app" : "splash");
  const [screen, setScreen]       = useState(startLoggedIn ? "home" : "vitrine");
  const [loggedIn, setLoggedIn]   = useState(startLoggedIn);
  const [astStep, setAstStep]     = useState(-1);
  const [astRes, setAstRes]       = useState({});
  const [astResult, setAstResult] = useState(null);
  const [astAnim, setAstAnim]     = useState(true);

  function handleLogin(){ setLoggedIn(true); setScreen("home"); }

  function astAvancar(id, valor){
    const novas={...astRes,[id]:valor};
    setAstRes(novas);
    if(astStep<STEPS_A.length-1){
      setAstAnim(false);
      setTimeout(()=>{setAstStep(s=>s+1);setAstAnim(true);},200);
    } else {
      const matches=EMPREEN.map(em=>{
        let score=0;
        if(novas.perfil&&em.perfil.includes(novas.perfil)) score+=3;
        if(novas.orcamento===em.orcamento) score+=3;
        const ls=Array.isArray(novas.lifestyle)?novas.lifestyle:[novas.lifestyle].filter(Boolean);
        ls.forEach(l=>{if(em.lifestyle.includes(l)) score+=2;});
        return {...em,score};
      }).sort((a,b)=>b.score-a.score);
      setAstResult(matches.slice(0,3));
    }
  }
  function astToggleMulti(id,valor){
    const atual=Array.isArray(astRes[id])?astRes[id]:[];
    const sd=STEPS_A[astStep];
    if(atual.includes(valor)){setAstRes(r=>({...r,[id]:atual.filter(v=>v!==valor)}));}
    else if(atual.length<(sd.max||99)){
      const novo=[...atual,valor];
      setAstRes(r=>({...r,[id]:novo}));
      if(novo.length===sd.max) setTimeout(()=>astAvancar(id,novo),300);
    }
  }
  function astReset(){setAstStep(-1);setAstRes({});setAstResult(null);}

  // ── Status bar ──
  function SBar({light}){
    const cc=light?"rgba(255,255,255,0.9)":T.text;
    return(
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px 4px",flexShrink:0}}>
        <span style={{fontSize:11,fontWeight:700,color:cc,fontFamily:FB}}>9:41</span>
        <div style={{width:80,height:22,backgroundColor:"rgba(0,0,0,0.9)",borderRadius:12}}/>
        <span style={{fontSize:9,color:cc,fontFamily:FB}}>●●● 67</span>
      </div>
    );
  }

  // ── Bottom Nav ──
  function NavBar(){
    const tabs=loggedIn
      ? [{k:"home",icon:"⌂",label:"Início"},{k:"servicos",icon:"⬡",label:"Serviços"},{k:"unidade",icon:"🏠",label:"Unidade"},{k:"financeiro_col",icon:"💳",label:"Financeiro"},{k:"perfil",icon:"○",label:"Perfil"}]
      : [{k:"vitrine",icon:"⌂",label:"Início"},{k:"assistente",icon:"✦",label:"Buscar lar"},{k:"explorar",icon:"◎",label:"Explorar"},{k:"entrar",icon:"○",label:"Entrar"}];
    return(
      <div style={{flexShrink:0,padding:"8px 10px 14px",background:T.dark,display:"flex",gap:4}}>
        <div style={{flex:1,display:"flex",backgroundColor:"rgba(255,255,255,0.07)",borderRadius:22,padding:"4px"}}>
          {tabs.map(t=>{
            const a=screen===t.k;
            return(
              <div key={t.k} onClick={()=>setScreen(t.k)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"6px 4px",borderRadius:18,backgroundColor:a?T.orange:"transparent",transition:"all 0.2s"}}>
                <span style={{fontSize:15,color:a?"#fff":"rgba(255,255,255,0.4)",lineHeight:1}}>{t.icon}</span>
                <span style={{fontSize:8.5,fontWeight:a?700:500,color:a?"#fff":"rgba(255,255,255,0.3)",fontFamily:FB}}>{t.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── SPLASH ──
  function SplashScreen(){
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#0D2A1A,#1A3A2A,#2A1A0A)"}}>
        <CBlob colors={[T.orange,T.orangeD]} style={{width:280,height:280,top:-80,right:-80,opacity:0.2}}/>
        <CBlob colors={["#1E4E9C","#0A2A5C"]} style={{width:220,height:220,bottom:100,left:-60,opacity:0.2}}/>
        <SBar light/>
        <div style={{position:"relative",flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 26px 44px"}}>
          <div style={{position:"absolute",top:10,left:26,display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:30,height:30,borderRadius:9,background:T.orange,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#fff",fontFamily:FB}}>C</div>
            <span style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:FB}}>collegiate.</span>
          </div>
          <div style={{fontSize:32,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.15,marginBottom:12,letterSpacing:"-0.5px"}}>
            Descubra onde<br/><span style={{color:T.orangeM}}>você quer morar.</span>
          </div>
          <div style={{fontSize:12.5,color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:30,fontFamily:FB}}>
            Explore empreendimentos, encontre a acomodação ideal e viva a experiência Collegiate.
          </div>
          <div onClick={()=>setAppPhase("app")} style={{background:T.orange,borderRadius:16,padding:"15px",textAlign:"center",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB,boxShadow:`0 8px 32px ${T.orange}66`,marginBottom:10}}>
            Explorar empreendimentos →
          </div>
          <div style={{textAlign:"center",fontSize:11.5,color:"rgba(255,255,255,0.3)",fontFamily:FB}}>
            Já tem reserva? <span style={{color:T.orangeM,fontWeight:600,cursor:"pointer"}} onClick={()=>{setAppPhase("app");handleLogin();}}>Entrar na conta</span>
          </div>
        </div>
      </div>
    );
  }

  // ── VITRINE ──
  function VitrineScreen(){
    const [catAtiva,setCatAtiva]=useState("Todos");
    const [det,setDet]=useState(null);
    const cats=["Todos","Disponível","Em obras"];
    const filtrados=catAtiva==="Todos"?EMPREEN:catAtiva==="Disponível"?EMPREEN.filter(e=>e.status==="Entregue"||e.status==="Lançamento"):EMPREEN.filter(e=>e.status.includes("obras"));

    if(det!==null){
      const em=EMPREEN.find(e=>e.id===det);
      return(
        <div style={{flex:1,overflowY:"auto",backgroundColor:"#fff"}}>
          <div style={{height:230,background:em.gradient,position:"relative"}}>
            <SBar light/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(26,14,6,0.8) 0%,transparent 55%)"}}/>
            <div style={{position:"absolute",top:52,left:14}}>
              <div onClick={()=>setDet(null)} style={{width:34,height:34,borderRadius:10,backgroundColor:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:"#fff",cursor:"pointer"}}>←</div>
            </div>
            <div style={{position:"absolute",bottom:16,left:18,right:18}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",fontFamily:FB,marginBottom:4}}>{em.emoji} {em.city.toUpperCase()}, {em.state}</div>
              <div style={{fontSize:22,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2,letterSpacing:"-0.3px"}}>{em.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                <CStars n={em.rating}/>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontFamily:FB}}>{em.rating} ({em.reviews})</span>
              </div>
            </div>
          </div>
          <div style={{padding:"16px 18px"}}>
            <div style={{backgroundColor:T.orangeL,borderRadius:14,padding:"12px 16px",marginBottom:14}}>
              <div style={{fontSize:11,color:T.textL,fontFamily:FB,marginBottom:2}}>A partir de</div>
              <div style={{fontSize:22,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {em.preco.toLocaleString()}<span style={{fontSize:12,color:T.textL}}>/mês</span></div>
            </div>
            <div style={{fontSize:13,color:T.textM,lineHeight:1.75,fontFamily:FB,marginBottom:14}}>{em.desc}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
              {["🛏 Mobiliado","📶 Wi-Fi Giga","🏋️ Academia 24h","💼 Coworking","🧺 Lavanderia"].map(a=>(
                <div key={a} style={{display:"flex",alignItems:"center",gap:7,backgroundColor:T.sand,borderRadius:10,padding:"9px 11px"}}>
                  <span style={{fontSize:14}}>{a.split(" ")[0]}</span>
                  <span style={{fontSize:11,color:T.textM,fontWeight:600,fontFamily:FB}}>{a.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
              {em.tags.map(tg=><span key={tg} style={{backgroundColor:T.orangeL,color:T.orangeD,borderRadius:7,padding:"4px 10px",fontSize:11,fontWeight:700,fontFamily:FB}}>{tg}</span>)}
            </div>
          </div>
          <div style={{position:"sticky",bottom:0,backgroundColor:"#fff",padding:"12px 18px 18px",borderTop:`1px solid ${T.tborder}`,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 -8px 28px rgba(26,14,6,0.07)"}}>
            <div>
              <div style={{fontSize:11,color:T.textL,fontFamily:FB}}>A partir de</div>
              <div style={{fontSize:20,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {em.preco.toLocaleString()}<span style={{fontSize:11,color:T.textL}}>/mês</span></div>
            </div>
            <div onClick={handleLogin} style={{backgroundColor:T.orange,borderRadius:14,padding:"13px 22px",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB,boxShadow:`0 8px 24px ${T.orange}55`}}>Quero morar aqui →</div>
          </div>
        </div>
      );
    }

    return(
      <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
        <div style={{background:T.dark,padding:"0 18px 18px",position:"relative",overflow:"hidden"}}>
          <SBar light/>
          <CBlob colors={[T.orange,T.orangeD]} style={{width:180,height:180,top:-70,right:-50,opacity:0.2}}/>
          <div style={{position:"relative"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{fontSize:10.5,color:"rgba(255,255,255,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:4}}>Encontre seu lar</div>
                <div style={{fontSize:20,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2,letterSpacing:"-0.3px"}}>Explore o<br/><span style={{color:T.orangeM}}>Collegiate</span></div>
              </div>
              <div style={{backgroundColor:"rgba(255,255,255,0.08)",borderRadius:12,padding:"8px 12px",textAlign:"center",border:"1px solid rgba(255,255,255,0.1)"}}>
                <div style={{fontSize:18}}>☀️</div>
                <div style={{fontSize:9.5,color:"rgba(255,255,255,0.6)",fontWeight:700,fontFamily:FB}}>26°C</div>
              </div>
            </div>
            <div style={{backgroundColor:"rgba(255,255,255,0.09)",borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,0.08)"}}>
              <span style={{fontSize:14,opacity:0.5}}>🔍</span>
              <span style={{fontSize:12,color:"rgba(255,255,255,0.35)",fontFamily:FB}}>Buscar por cidade ou empreendimento…</span>
            </div>
          </div>
        </div>
        <div style={{padding:"12px 18px 0",display:"flex",gap:7,overflowX:"auto"}}>
          {cats.map(c=><CTag key={c} active={catAtiva===c} onClick={()=>setCatAtiva(c)}>{c}</CTag>)}
        </div>
        <div style={{padding:"14px 18px 0"}}>
          <div onClick={()=>setDet(1)} style={{borderRadius:22,overflow:"hidden",cursor:"pointer",boxShadow:"0 16px 48px rgba(26,14,6,0.15)"}}>
            <div style={{height:200,background:EMPREEN[0].gradient,position:"relative",display:"flex",alignItems:"flex-end",padding:"12px 16px"}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(26,14,6,0.75) 0%,transparent 55%)"}}/>
              <div style={{position:"absolute",top:12,left:14}}><span style={{backgroundColor:T.orange,borderRadius:7,padding:"4px 10px",fontSize:9.5,fontWeight:700,color:"#fff",fontFamily:FB}}>✦ LANÇAMENTO</span></div>
              <div style={{position:"absolute",top:12,right:14}}>
                <div style={{backgroundColor:"rgba(255,255,255,0.15)",borderRadius:9,padding:"4px 9px",display:"flex",alignItems:"center",gap:4,backdropFilter:"blur(8px)"}}>
                  <span style={{fontSize:10}}>⭐</span><span style={{fontSize:11,fontWeight:700,color:"#fff",fontFamily:FB}}>{EMPREEN[0].reviews}</span>
                </div>
              </div>
              <div style={{position:"relative"}}>
                <div style={{fontSize:20,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2}}>{EMPREEN[0].name}</div>
                <div style={{fontSize:11.5,color:"rgba(255,255,255,0.65)",fontFamily:FB,marginTop:2}}>📍 {EMPREEN[0].city}, {EMPREEN[0].state} · {EMPREEN[0].tipo}</div>
              </div>
            </div>
            <div style={{backgroundColor:"#fff",padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:11,color:T.textL,fontFamily:FB}}>A partir de</div>
                <div style={{fontSize:19,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {EMPREEN[0].preco.toLocaleString()}<span style={{fontSize:11,color:T.textL}}>/mês</span></div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4,maxWidth:150}}>
                {EMPREEN[0].tags.slice(0,3).map(tg=><span key={tg} style={{fontSize:9.5,backgroundColor:T.orangeL,color:T.orangeD,padding:"3px 7px",borderRadius:5,fontWeight:600,fontFamily:FB}}>{tg}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div style={{padding:"16px 18px 0"}}>
          <div style={{fontSize:10.5,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:FB,marginBottom:10}}>Todos os empreendimentos</div>
          {filtrados.map(em=>(
            <div key={em.id} onClick={()=>setDet(em.id)} style={{backgroundColor:"#fff",borderRadius:18,marginBottom:11,overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 18px rgba(26,14,6,0.07)",border:`1px solid ${T.tborder}`}}>
              <div style={{height:72,background:em.gradient,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                <span style={{fontSize:28}}>{em.emoji}</span>
                <div style={{position:"absolute",top:9,right:10}}>
                  <span style={{backgroundColor:em.status==="Lançamento"?T.orange:em.status.includes("100%")?"#777":T.dark,borderRadius:6,padding:"3px 8px",fontSize:9,fontWeight:700,color:"#fff",fontFamily:FB}}>{em.status}</span>
                </div>
              </div>
              <div style={{padding:"11px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                  <div style={{fontSize:13.5,fontWeight:700,color:T.text,fontFamily:FD}}>{em.name}</div>
                  <div style={{backgroundColor:T.orangeL,borderRadius:7,padding:"3px 7px",display:"flex",alignItems:"center",gap:2}}>
                    <span style={{fontSize:9}}>⭐</span><span style={{fontSize:10.5,fontWeight:700,color:T.orangeD,fontFamily:FB}}>{em.rating}</span>
                  </div>
                </div>
                <div style={{fontSize:11,color:T.textL,fontFamily:FB,marginBottom:7}}>📍 {em.city}, {em.state} · {em.tipo}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:15,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {em.preco.toLocaleString()}<span style={{fontSize:10,fontWeight:500,color:T.textL}}>/mês</span></div>
                  <div style={{display:"flex",gap:4}}>
                    {em.tags.slice(0,2).map(tg=><span key={tg} style={{fontSize:9.5,backgroundColor:T.sand,color:T.textM,padding:"3px 7px",borderRadius:5,fontWeight:600,fontFamily:FB}}>{tg}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div onClick={()=>setScreen("assistente")} style={{background:T.dark,borderRadius:20,padding:"18px 20px",marginBottom:22,cursor:"pointer",position:"relative",overflow:"hidden"}}>
            <CBlob colors={[T.orange,T.orangeD]} style={{width:140,height:140,top:-40,right:-30,opacity:0.3}}/>
            <div style={{position:"relative"}}>
              <div style={{fontSize:10.5,color:T.orangeM,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:5}}>✦ Assistente Collegiate</div>
              <div style={{fontSize:16,fontWeight:800,color:"#fff",fontFamily:FD,marginBottom:5,lineHeight:1.3}}>Não sabe por onde começar?</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontFamily:FB,marginBottom:13,lineHeight:1.6}}>Responda 5 perguntas e deixe o Collegiate encontrar a acomodação perfeita para você.</div>
              <div style={{backgroundColor:T.orange,borderRadius:10,padding:"9px 16px",display:"inline-block",fontSize:12,fontWeight:700,color:"#fff",fontFamily:FB}}>Encontrar meu lar →</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ASSISTENTE ──
  function AssistenteScreen(){
    const stepData=astStep>=0&&astStep<STEPS_A.length?STEPS_A[astStep]:null;
    const progress=astStep<0?0:((astStep+1)/STEPS_A.length)*100;

    if(astResult){
      return(
        <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
          <SBar/>
          <div style={{padding:"0 18px 28px"}}>
            <div style={{background:T.dark,borderRadius:20,padding:"22px 18px",marginBottom:18,position:"relative",overflow:"hidden"}}>
              <CBlob colors={[T.orange,T.orangeD]} style={{width:180,height:180,top:-50,right:-30,opacity:0.3}}/>
              <div style={{position:"relative"}}>
                <div style={{fontSize:26}}>🎯</div>
                <div style={{fontSize:19,fontWeight:800,color:"#fff",fontFamily:FD,marginTop:8,lineHeight:1.3}}>Encontramos o seu<br/><span style={{color:T.orangeM}}>lar ideal!</span></div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",fontFamily:FB,marginTop:5}}>Com base nas suas respostas, estas são as melhores opções</div>
              </div>
            </div>
            {astResult.map((em,i)=>(
              <div key={em.id} onClick={()=>{setScreen("vitrine");}} style={{backgroundColor:"#fff",borderRadius:18,marginBottom:11,overflow:"hidden",cursor:"pointer",boxShadow:i===0?`0 8px 32px ${T.orange}22`:"0 4px 14px rgba(26,14,6,0.07)",border:i===0?`2px solid ${T.orange}`:`1px solid ${T.tborder}`}}>
                <div style={{height:80,background:em.gradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontSize:32}}>{em.emoji}</span>
                  <div style={{position:"absolute",top:9,left:11}}>
                    <span style={{backgroundColor:i===0?T.orange:"rgba(0,0,0,0.5)",borderRadius:7,padding:"4px 10px",fontSize:9.5,fontWeight:800,color:"#fff",fontFamily:FB}}>{i===0?"✦ MELHOR MATCH":`#${i+1} opção`}</span>
                  </div>
                </div>
                <div style={{padding:"11px 14px"}}>
                  <div style={{fontSize:14,fontWeight:800,color:T.text,fontFamily:FD,marginBottom:2}}>{em.name}</div>
                  <div style={{fontSize:11,color:T.textL,fontFamily:FB,marginBottom:7}}>📍 {em.city}, {em.state} · {em.tipo}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontSize:16,fontWeight:800,color:T.orange,fontFamily:FD}}>R$ {em.preco.toLocaleString()}<span style={{fontSize:10,color:T.textL}}>/mês</span></div>
                    <div style={{display:"flex",gap:4}}>
                      {em.tags.slice(0,2).map(tg=><span key={tg} style={{fontSize:9.5,backgroundColor:T.orangeL,color:T.orangeD,padding:"3px 7px",borderRadius:5,fontWeight:600,fontFamily:FB}}>{tg}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div onClick={astReset} style={{border:`1.5px solid ${T.orange}`,borderRadius:14,padding:"12px",textAlign:"center",fontSize:13,fontWeight:700,color:T.orange,cursor:"pointer",fontFamily:FB}}>Refazer busca</div>
          </div>
        </div>
      );
    }

    if(astStep===-1){
      return(
        <div style={{flex:1,display:"flex",flexDirection:"column",backgroundColor:T.cream,position:"relative",overflow:"hidden"}}>
          <CBlob colors={[T.orange,"#FFB380"]} style={{width:260,height:260,top:-60,right:-80,opacity:0.15}}/>
          <CBlob colors={["#1E4E9C","#0A2A5C"]} style={{width:200,height:200,bottom:60,left:-60,opacity:0.1}}/>
          <SBar/>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"10px 26px 36px",position:"relative"}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:`radial-gradient(circle,${T.orange},${T.orangeD})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,marginBottom:22,boxShadow:`0 16px 48px ${T.orange}44`}}>🏠</div>
            <div style={{fontSize:10.5,color:T.orange,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:FB,marginBottom:7}}>Assistente Collegiate</div>
            <div style={{fontSize:24,fontWeight:800,color:T.text,fontFamily:FD,lineHeight:1.2,marginBottom:12,letterSpacing:"-0.5px"}}>Como posso ajudar você hoje?</div>
            <div style={{fontSize:13,color:T.textM,lineHeight:1.75,fontFamily:FB,marginBottom:26}}>Responda 5 perguntas rápidas e eu vou encontrar a acomodação Collegiate perfeita para o seu perfil, orçamento e estilo de vida.</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:24}}>
              {["Executivo/Negócios","Nômade digital","Até R$ 2.000/mês","Sul de Minas"].map(s=>(
                <div key={s} style={{backgroundColor:"#fff",borderRadius:20,padding:"6px 13px",fontSize:11.5,fontWeight:600,color:T.textM,cursor:"pointer",border:`1.5px solid ${T.tborder}`,fontFamily:FB}}>{s}</div>
              ))}
            </div>
            <div onClick={()=>{setAstStep(0);setAstAnim(true);}} style={{background:T.orange,borderRadius:16,padding:"15px",textAlign:"center",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB,boxShadow:`0 10px 32px ${T.orange}55`}}>Começar agora ✦</div>
          </div>
        </div>
      );
    }

    const isMulti=stepData.tipo==="multi";
    const selecionados=isMulti?(Array.isArray(astRes[stepData.id])?astRes[stepData.id]:[]):astRes[stepData.id];

    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",backgroundColor:T.cream,overflow:"hidden"}}>
        <SBar/>
        <div style={{padding:"0 18px 12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <div onClick={()=>setAstStep(s=>Math.max(-1,s-1))} style={{fontSize:11.5,color:T.textL,cursor:"pointer",fontFamily:FB,fontWeight:600}}>← Voltar</div>
            <div style={{fontSize:11.5,color:T.textL,fontFamily:FB,fontWeight:600}}>{astStep+1} de {STEPS_A.length}</div>
          </div>
          <div style={{height:4,backgroundColor:T.sandM,borderRadius:2,overflow:"hidden"}}>
            <div style={{width:`${progress}%`,height:"100%",background:T.orange,borderRadius:2,transition:"width 0.4s ease"}}/>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"4px 18px 24px",opacity:astAnim?1:0,transform:`translateY(${astAnim?0:12}px)`,transition:"all 0.2s ease"}}>
          <div style={{marginBottom:22}}>
            <div style={{fontSize:26,marginBottom:10}}>{stepData.icon}</div>
            <div style={{fontSize:20,fontWeight:800,color:T.text,fontFamily:FD,lineHeight:1.25,marginBottom:5,letterSpacing:"-0.3px"}}>{stepData.pergunta}</div>
            <div style={{fontSize:12.5,color:T.textL,fontFamily:FB,lineHeight:1.6}}>{stepData.sub}{isMulti?` (máx. ${stepData.max})`:""}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {stepData.opcoes.map(op=>{
              const sel=isMulti?selecionados.includes(op.value):selecionados===op.value;
              return(
                <div key={op.value} onClick={()=>isMulti?astToggleMulti(stepData.id,op.value):astAvancar(stepData.id,op.value)} style={{backgroundColor:sel?T.dark:"#fff",borderRadius:16,padding:"13px 15px",display:"flex",alignItems:"center",gap:13,cursor:"pointer",transition:"all 0.18s",border:`2px solid ${sel?T.orange:T.tborder}`,boxShadow:sel?`0 6px 22px ${T.orange}33`:"0 2px 8px rgba(26,14,6,0.05)"}}>
                  <div style={{width:40,height:40,borderRadius:12,flexShrink:0,background:sel?T.orange:T.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,transition:"all 0.18s"}}>{op.icon}</div>
                  <span style={{fontSize:13.5,fontWeight:600,fontFamily:FB,color:sel?"#fff":T.text}}>{op.label}</span>
                  {sel&&<div style={{marginLeft:"auto",width:20,height:20,borderRadius:"50%",backgroundColor:T.orange,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,color:"#fff",fontWeight:800}}>✓</span></div>}
                </div>
              );
            })}
          </div>
          {isMulti&&selecionados.length>0&&selecionados.length<stepData.max&&(
            <div onClick={()=>astAvancar(stepData.id,selecionados)} style={{marginTop:14,backgroundColor:T.orange,borderRadius:14,padding:"13px",textAlign:"center",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB}}>Continuar →</div>
          )}
        </div>
      </div>
    );
  }

  // ── HOME MORADOR ──
  function HomeLoggedScreen(){
    return(
      <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
        <div style={{background:T.dark,padding:"0 18px 20px",position:"relative",overflow:"hidden"}}>
          <SBar light/>
          <CBlob colors={[T.orange,T.orangeD]} style={{width:190,height:190,top:-70,right:-50,opacity:0.22}}/>
          <div style={{position:"relative"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{fontSize:10.5,color:"rgba(255,255,255,0.4)",fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",fontFamily:FB,marginBottom:3}}>Bem-vindo ao lar ✦</div>
                <div style={{fontSize:20,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2,letterSpacing:"-0.3px"}}>Bom dia,<br/><span style={{color:T.orangeM}}>Ricardo</span></div>
              </div>
              <div style={{display:"flex",gap:7,alignItems:"center"}}>
                <div style={{backgroundColor:"rgba(255,255,255,0.08)",borderRadius:11,padding:"7px 11px",textAlign:"center"}}>
                  <div style={{fontSize:16}}>☀️</div><div style={{fontSize:9,color:"rgba(255,255,255,0.6)",fontWeight:700,fontFamily:FB}}>26°C</div>
                </div>
                <div style={{width:34,height:34,borderRadius:10,background:T.orange,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",fontFamily:FB}}>RC</div>
              </div>
            </div>
            <div onClick={()=>setScreen("unidade")} style={{backgroundColor:"rgba(255,255,255,0.07)",borderRadius:12,padding:"10px 13px",display:"flex",alignItems:"center",gap:9,border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer"}}>
              <span style={{fontSize:15}}>🏢</span>
              <div style={{flex:1}}>
                <div style={{fontSize:10.5,color:"rgba(255,255,255,0.4)",fontFamily:FB,marginBottom:1}}>Minha Unidade</div>
                <div style={{fontSize:12.5,fontWeight:700,color:"#fff",fontFamily:FB}}>Unidade 402, Bloco A · Collegiate Housi SJDR</div>
              </div>
              <span style={{color:"rgba(255,255,255,0.35)",fontSize:16}}>›</span>
            </div>
          </div>
        </div>
        <div style={{padding:"10px 18px 0"}}>
          <div style={{background:`linear-gradient(135deg,#FFF8F0,${T.orangeL})`,borderRadius:14,padding:"11px 15px",border:`1.5px solid ${T.orangeL}`,display:"flex",gap:9,alignItems:"flex-start"}}>
            <span style={{fontSize:15}}>📢</span>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:T.text,fontFamily:FB}}>Aviso do Condomínio</div>
              <div style={{fontSize:11.5,color:T.textM,fontFamily:FB,lineHeight:1.5}}>Manutenção agendada na piscina das 08h às 14h hoje.</div>
            </div>
          </div>
        </div>
        <div style={{padding:"14px 18px 0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
            <div style={{fontSize:10.5,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:FB}}>Serviços a um toque</div>
            <span style={{fontSize:11,color:T.orange,fontWeight:700,fontFamily:FB,cursor:"pointer"}} onClick={()=>setScreen("servicos")}>Ver todos</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            {[
              {icon:"🗓",label:"Reservas",     sub:"Suas reservas ativas",  action:"reservas"},
              {icon:"🏠",label:"Meu Quarto",   sub:"Check-in e detalhes",   action:"meu_quarto"},
              {icon:"💳",label:"Financeiro",sub:"Pagamentos e histórico",   action:"financeiro_col"},
              {icon:"🧹",label:"Serviços",     sub:"Limpeza e manutenção",  action:"servicos"},
            ].map(s=>(
              <div key={s.label} onClick={()=>setScreen(s.action)} style={{backgroundColor:"#fff",borderRadius:16,padding:"13px 13px",cursor:"pointer",boxShadow:"0 2px 10px rgba(26,14,6,0.06)",border:`1px solid ${T.tborder}`}}>
                <div style={{width:34,height:34,borderRadius:9,backgroundColor:T.orangeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,marginBottom:7}}>{s.icon}</div>
                <div style={{fontSize:12.5,fontWeight:700,color:T.text,fontFamily:FB}}>{s.label}</div>
                <div style={{fontSize:10.5,color:T.textL,fontFamily:FB,marginTop:2}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{height:18}}/>
      </div>
    );
  }

  // ── SERVIÇOS ──
  function ServicosScreen(){
    const serviceCards=[
      {icon:"🧹",name:"Limpeza",desc:"Serviço de limpeza semanal do apartamento. Solicite via app com até 24h de antecedência.",info:"Seg a Sáb · 08h–18h"},
      {icon:"👕",name:"Lavanderia",desc:"Máquinas de lavar e secar de uso compartilhado disponíveis no 3º andar, Bloco B.",info:"24 horas · Andar 3, Bloco B"},
      {icon:"🔧",name:"Manutenção",desc:"Abra um chamado para reparos elétricos, hidráulicos ou estruturais na sua unidade.",info:"Atendimento em até 24h"},
      {icon:"🛒",name:"Mini Mercado",desc:"Itens de conveniência disponíveis na loja do térreo. Aceita Pix e cartão.",info:"Seg a Dom · 07h–23h · Térreo"},
      {icon:"🏋️",name:"Academia",desc:"Equipamentos profissionais disponíveis para todos os hóspedes. Acesso com crachá.",info:"24 horas · Andar 2"},
      {icon:"📦",name:"Encomendas",desc:"Recebimento e guarda de encomendas na portaria. Notificação automática via app.",info:"Seg a Dom · 08h–22h"},
    ];
    return(
      <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
        <SBar/>
        <div style={{padding:"0 18px 13px"}}>
          <div style={{fontSize:19,fontWeight:800,color:T.text,fontFamily:FD,marginBottom:3}}>Serviços</div>
          <div style={{fontSize:12,color:T.textL,fontFamily:FB,marginBottom:12}}>Tudo que você precisa no seu dia a dia</div>
        </div>
        <div style={{padding:"0 18px 24px"}}>
          {serviceCards.map(s=>(
            <div key={s.name} style={{backgroundColor:"#fff",borderRadius:18,padding:"14px 15px",marginBottom:9,display:"flex",gap:13,alignItems:"flex-start",boxShadow:"0 2px 11px rgba(26,14,6,0.06)",border:`1px solid ${T.tborder}`}}>
              <div style={{width:44,height:44,borderRadius:13,backgroundColor:T.orangeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5,fontWeight:700,color:T.text,fontFamily:FB,marginBottom:3}}>{s.name}</div>
                <div style={{fontSize:11.5,color:T.textM,fontFamily:FB,lineHeight:1.55,marginBottom:7}}>{s.desc}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:4,backgroundColor:T.sand,borderRadius:7,padding:"4px 9px"}}>
                  <span style={{fontSize:10}}>🕐</span>
                  <span style={{fontSize:10.5,fontWeight:600,color:T.textM,fontFamily:FB}}>{s.info}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── FINANCEIRO ──
  function FinanceiroColScreen(){
    return(
      <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
        <SBar/>
        <div style={{padding:"0 18px 13px"}}>
          <div style={{fontSize:19,fontWeight:800,color:T.text,fontFamily:FD,marginBottom:3}}>Financeiro</div>
          <div style={{fontSize:12,color:T.textL,fontFamily:FB,marginBottom:12}}>Pagamentos e histórico da sua unidade</div>
        </div>
        <div style={{padding:"0 18px 24px"}}>
          <div style={{backgroundColor:"#fff",borderRadius:20,padding:"19px",boxShadow:"0 4px 18px rgba(26,14,6,0.07)",marginBottom:11,border:`1px solid ${T.tborder}`}}>
            <div style={{fontSize:10.5,color:T.orange,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:5}}>Financeiro · Minha Unidade</div>
            <div style={{fontSize:12,color:T.textL,fontFamily:FB,marginBottom:13}}>Taxa de Condomínio / Aluguel</div>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}>
              <div style={{width:7,height:7,borderRadius:"50%",backgroundColor:T.orange}}/><div style={{fontSize:11,color:T.orange,fontWeight:600,fontFamily:FB}}>Vence em 05 de Novembro</div>
            </div>
            <div style={{fontSize:10.5,color:T.textL,fontFamily:FB,marginBottom:3}}>TOTAL A PAGAR</div>
            <div style={{fontSize:28,fontWeight:800,color:T.text,fontFamily:FD,marginBottom:16,letterSpacing:"-0.5px"}}>R$ 3.250,00</div>
            <div style={{display:"flex",gap:9}}>
              <div style={{flex:1,backgroundColor:T.orange,borderRadius:11,padding:"11px",textAlign:"center",fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB,boxShadow:`0 6px 18px ${T.orange}44`}}>📋 Copiar Pix</div>
              <div style={{flex:1,backgroundColor:T.sand,borderRadius:11,padding:"11px",textAlign:"center",fontSize:12,fontWeight:600,color:T.textM,cursor:"pointer",fontFamily:FB,border:`1px solid ${T.sandM}`}}>📄 Boleto PDF</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            {[{l:"Último Pagamento",v:"✓ Confirmado",sub:"05 Out",vc:T.tgreen},{l:"Fundo de Reserva",v:"R$ 12.400",sub:"Acumulado",vc:T.text}].map(c=>(
              <div key={c.l} style={{backgroundColor:"#fff",borderRadius:16,padding:"13px",boxShadow:"0 2px 9px rgba(26,14,6,0.05)",border:`1px solid ${T.tborder}`}}>
                <div style={{fontSize:9.5,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:5}}>{c.l}</div>
                <div style={{fontSize:13.5,fontWeight:800,color:c.vc,fontFamily:FB}}>{c.v}</div>
                <div style={{fontSize:10.5,color:T.textL,fontFamily:FB,marginTop:2}}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  // ── PERFIL ──
  function PerfilScreen(){
    return(
      <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
        <div style={{background:T.dark,borderRadius:"0 0 22px 22px",padding:"0 18px 26px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <CBlob colors={[T.orange,T.orangeD]} style={{width:150,height:150,top:-40,right:-40,opacity:0.2}}/>
          <SBar light/>
          <div style={{width:58,height:58,borderRadius:17,background:T.orange,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,fontWeight:800,color:"#fff",margin:"8px auto 11px",position:"relative"}}>RC</div>
          <div style={{fontSize:16,fontWeight:800,color:"#fff",fontFamily:FD}}>Ricardo Alves</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",fontFamily:FB,marginTop:2}}>Morador · Unidade 402, Bloco A</div>
        </div>
        <div style={{padding:"14px 18px"}}>
          <div onClick={()=>setScreen("unidade")} style={{backgroundColor:"#fff",borderRadius:18,padding:"13px 17px",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 4px 18px rgba(26,14,6,0.07)",border:`1px solid ${T.tborder}`,marginBottom:9,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:36,height:36,borderRadius:11,backgroundColor:T.orangeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏢</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:T.text,fontFamily:FB}}>Minha Unidade</div>
                <div style={{fontSize:11,color:T.textL,fontFamily:FB}}>Manual, regras e documentos</div>
              </div>
            </div>
            <span style={{color:T.textL,fontSize:16}}>›</span>
          </div>
          <div style={{backgroundColor:"#fff",borderRadius:18,overflow:"hidden",boxShadow:"0 4px 18px rgba(26,14,6,0.07)",border:`1px solid ${T.tborder}`,marginBottom:10}}>
            {["Notificações","Privacidade e Dados","Ajuda e Suporte"].map((item,i,arr)=>(
              <div key={item} style={{padding:"13px 17px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:i<arr.length-1?`1px solid ${T.tborder}`:"none",cursor:"pointer"}}>
                <span style={{fontSize:13.5,color:T.text,fontWeight:500,fontFamily:FB}}>{item}</span>
                <span style={{color:T.textL}}>›</span>
              </div>
            ))}
          </div>
          <div onClick={()=>{setLoggedIn(false);setScreen("vitrine");setAppPhase("splash");}} style={{border:`1.5px solid #DC2626`,borderRadius:14,padding:"12px",textAlign:"center",fontSize:13,fontWeight:700,color:"#DC2626",cursor:"pointer",fontFamily:FB}}>Sair do app</div>
        </div>
      </div>
    );
  }

  // ── MINHA UNIDADE ──
  function UnidadeScreen(){
    return(
      <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
        <div style={{background:T.dark,padding:"0 18px 20px",position:"relative",overflow:"hidden"}}>
          <CBlob colors={[T.orange,T.orangeD]} style={{width:160,height:160,top:-50,right:-40,opacity:0.2}}/>
          <SBar light/>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,position:"relative"}}>
            <div onClick={()=>setScreen("perfil")} style={{width:30,height:30,borderRadius:9,backgroundColor:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",cursor:"pointer"}}>←</div>
            <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.6)",fontFamily:FB}}>Minha Unidade</span>
          </div>
          <div style={{position:"relative"}}>
            <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2,marginBottom:3}}>Unidade 402, Bloco A</div>
            <div style={{fontSize:11.5,color:"rgba(255,255,255,0.45)",fontFamily:FB}}>Collegiate Housi SJDR · Contrato ativo</div>
          </div>
        </div>
        <div style={{padding:"14px 18px 24px"}}>
          <div style={{fontSize:10,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:FB,marginBottom:10}}>Documentos e Informações</div>
          <div style={{backgroundColor:"#fff",borderRadius:18,overflow:"hidden",boxShadow:"0 4px 18px rgba(26,14,6,0.07)",border:`1px solid ${T.tborder}`,marginBottom:12}}>
            {[
              {icon:"📖",label:"Manual do Morador",sub:"Normas de uso e convivência"},
              {icon:"📋",label:"Regras do Prédio",sub:"Regulamento interno"},
              {icon:"📄",label:"Meu Contrato",sub:"Vigência e condições"},
            ].map((item,i,arr)=>(
              <div key={item.label} style={{padding:"13px 15px",display:"flex",alignItems:"center",gap:12,borderBottom:i<arr.length-1?`1px solid ${T.tborder}`:"none",cursor:"pointer"}}>
                <div style={{width:36,height:36,borderRadius:10,backgroundColor:T.orangeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{item.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:T.text,fontFamily:FB}}>{item.label}</div>
                  <div style={{fontSize:11,color:T.textL,fontFamily:FB}}>{item.sub}</div>
                </div>
                <span style={{color:T.textL}}>›</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:10,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:FB,marginBottom:10}}>Histórico e Suporte</div>
          <div style={{backgroundColor:"#fff",borderRadius:18,overflow:"hidden",boxShadow:"0 4px 18px rgba(26,14,6,0.07)",border:`1px solid ${T.tborder}`}}>
            {[
              {icon:"💳",label:"Histórico de Pagamentos",sub:"Comprovantes e faturas anteriores"},
              {icon:"🔧",label:"Chamados de Manutenção",sub:"Abertura e acompanhamento"},
              {icon:"🔔",label:"Notificações da Unidade",sub:"Avisos e comunicados do condomínio"},
            ].map((item,i,arr)=>(
              <div key={item.label} style={{padding:"13px 15px",display:"flex",alignItems:"center",gap:12,borderBottom:i<arr.length-1?`1px solid ${T.tborder}`:"none",cursor:"pointer"}}>
                <div style={{width:36,height:36,borderRadius:10,backgroundColor:T.sand,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{item.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:T.text,fontFamily:FB}}>{item.label}</div>
                  <div style={{fontSize:11,color:T.textL,fontFamily:FB}}>{item.sub}</div>
                </div>
                <span style={{color:T.textL}}>›</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── RESERVAS ──
  function ReservasScreen(){
    const reservas=[
      {id:"#R-2411",nome:"Collegiate Housi SJDR",unidade:"Unidade 402 · Bloco A",checkin:"01 Nov 2024",checkout:"30 Nov 2024",status:"Ativa",valor:"R$ 3.250"},
      {id:"#R-2310",nome:"Collegiate Housi SJDR",unidade:"Unidade 402 · Bloco A",checkin:"01 Out 2024",checkout:"31 Out 2024",status:"Concluída",valor:"R$ 3.250"},
      {id:"#R-2209",nome:"Collegiate Housi SJDR",unidade:"Unidade 402 · Bloco A",checkin:"01 Set 2024",checkout:"30 Set 2024",status:"Concluída",valor:"R$ 3.100"},
    ];
    return(
      <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
        <SBar/>
        <div style={{padding:"0 18px 16px"}}>
          <div style={{fontSize:19,fontWeight:800,color:T.text,fontFamily:FD,marginBottom:3}}>Minhas Reservas</div>
          <div style={{fontSize:12,color:T.textL,fontFamily:FB,marginBottom:16}}>Histórico e reservas ativas</div>
          {reservas.map((r,i)=>(
            <div key={r.id} style={{backgroundColor:"#fff",borderRadius:18,padding:"14px 16px",marginBottom:11,boxShadow:"0 4px 18px rgba(26,14,6,0.07)",border:`1px solid ${T.tborder}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div>
                  <div style={{fontSize:13.5,fontWeight:700,color:T.text,fontFamily:FD}}>{r.nome}</div>
                  <div style={{fontSize:11,color:T.textL,fontFamily:FB,marginTop:2}}>{r.unidade}</div>
                </div>
                <span style={{backgroundColor:r.status==="Ativa"?T.tgreenL:"#F0EBE2",color:r.status==="Ativa"?T.tgreen:T.textM,borderRadius:7,padding:"3px 9px",fontSize:10,fontWeight:700,fontFamily:FB}}>{r.status}</span>
              </div>
              <div style={{height:"0.5px",backgroundColor:T.tborder,margin:"8px 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontSize:9.5,color:T.textL,fontFamily:FB,fontWeight:600,marginBottom:2}}>CHECK-IN</div>
                  <div style={{fontSize:12,fontWeight:700,color:T.text,fontFamily:FB}}>{r.checkin}</div>
                </div>
                <div style={{color:T.textL,fontSize:16}}>→</div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:9.5,color:T.textL,fontFamily:FB,fontWeight:600,marginBottom:2}}>CHECK-OUT</div>
                  <div style={{fontSize:12,fontWeight:700,color:T.text,fontFamily:FB}}>{r.checkout}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:9.5,color:T.textL,fontFamily:FB,fontWeight:600,marginBottom:2}}>VALOR</div>
                  <div style={{fontSize:13,fontWeight:800,color:T.orange,fontFamily:FD}}>{r.valor}</div>
                </div>
              </div>
              {r.status==="Ativa"&&(
                <div onClick={()=>setScreen("meu_quarto")} style={{marginTop:10,backgroundColor:T.orange,borderRadius:11,padding:"10px",textAlign:"center",fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB}}>Ver meu quarto →</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── MEU QUARTO ──
  function MeuQuartoScreen(){
    return(
      <div style={{flex:1,overflowY:"auto",backgroundColor:T.cream}}>
        <div style={{background:T.dark,padding:"0 18px 20px",position:"relative",overflow:"hidden"}}>
          <CBlob colors={[T.orange,T.orangeD]} style={{width:150,height:150,top:-50,right:-40,opacity:0.2}}/>
          <SBar light/>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,position:"relative"}}>
            <div onClick={()=>setScreen("reservas")} style={{width:30,height:30,borderRadius:9,backgroundColor:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",cursor:"pointer"}}>←</div>
            <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.6)",fontFamily:FB}}>Meu Quarto</span>
          </div>
          <div style={{position:"relative"}}>
            <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:FD,lineHeight:1.2,marginBottom:3}}>Unidade 402, Bloco A</div>
            <div style={{fontSize:11.5,color:"rgba(255,255,255,0.45)",fontFamily:FB}}>Collegiate Housi SJDR · Studio 28m²</div>
          </div>
        </div>
        <div style={{padding:"14px 18px 24px"}}>
          <div style={{backgroundColor:"#fff",borderRadius:18,padding:"16px",marginBottom:11,boxShadow:"0 4px 18px rgba(26,14,6,0.07)",border:`1px solid ${T.tborder}`}}>
            <div style={{fontSize:10,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:FB,marginBottom:12}}>Status da Estadia</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                {l:"Check-in",v:"01 Nov 2024",ic:"📅"},
                {l:"Check-out",v:"30 Nov 2024",ic:"📅"},
                {l:"Andar",v:"4º · Torre Norte",ic:"🏢"},
                {l:"Área",v:"28 m² · Studio",ic:"📐"},
              ].map(s=>(
                <div key={s.l} style={{backgroundColor:T.sand,borderRadius:12,padding:"10px 12px"}}>
                  <div style={{fontSize:11}}>{ s.ic}</div>
                  <div style={{fontSize:9.5,color:T.textL,fontFamily:FB,marginTop:3}}>{s.l}</div>
                  <div style={{fontSize:12,fontWeight:700,color:T.text,fontFamily:FB,marginTop:2}}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{fontSize:10,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:FB,marginBottom:10}}>Amenidades do Quarto</div>
          <div style={{backgroundColor:"#fff",borderRadius:18,overflow:"hidden",border:`1px solid ${T.tborder}`}}>
            {[
              {icon:"📶",nome:"Wi-Fi Giga",info:"Collegiate_Resident · Senha no app"},
              {icon:"❄️",nome:"Ar-condicionado",info:"Controle na lateral da cama"},
              {icon:"📺",nome:"Smart TV",nome2:"65\" · Netflix e apps incluídos"},
              {icon:"🧺",nome:"Lavanderia",info:"3º andar, Bloco B · 24h"},
            ].map((a,i,arr)=>(
              <div key={a.nome} style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:i<arr.length-1?`0.5px solid ${T.tborder}`:"none"}}>
                <div style={{width:34,height:34,borderRadius:10,backgroundColor:T.orangeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{a.icon}</div>
                <div>
                  <div style={{fontSize:12.5,fontWeight:600,color:T.text,fontFamily:FB}}>{a.nome}</div>
                  <div style={{fontSize:10.5,color:T.textL,fontFamily:FB,marginTop:1}}>{a.info||a.nome2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── CHAT COLLEGIATE ──
  function ChatCollegiateScreen(){
    const msgs=[
      {from:"gestao",text:"Olá, Ricardo! Estamos aqui para ajudar. Qual é a sua dúvida?",time:"10:00"},
      {from:"user",  text:"Boa tarde! Queria solicitar a limpeza para esta quinta-feira.",time:"10:02"},
      {from:"gestao",text:"Claro! Confirmado para quinta-feira, 07 Nov às 09h. O profissional terá acesso com supervisão da portaria.",time:"10:04"},
      {from:"user",  text:"Perfeito, obrigado!",time:"10:05"},
      {from:"gestao",text:"Às ordens! Qualquer outra necessidade é só chamar 😊",time:"10:05"},
    ];
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",backgroundColor:T.cream}}>
        <div style={{background:T.dark,padding:"0 18px 14px",flexShrink:0}}>
          <SBar light/>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,borderRadius:12,backgroundColor:T.orange,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#fff",flexShrink:0}}>C</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:FD}}>Gestão Collegiate</div>
              <div style={{fontSize:10.5,color:"rgba(255,255,255,0.45)",fontFamily:FB}}>● Online agora</div>
            </div>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"14px 18px",display:"flex",flexDirection:"column",gap:10}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}>
              <div style={{maxWidth:"80%",backgroundColor:m.from==="user"?T.orange:"#fff",borderRadius:m.from==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",padding:"10px 13px",border:m.from==="user"?"none":`1px solid ${T.tborder}`}}>
                <div style={{fontSize:12,color:m.from==="user"?"#fff":T.text,fontFamily:FB,lineHeight:1.5}}>{m.text}</div>
                <div style={{fontSize:9.5,color:m.from==="user"?"rgba(255,255,255,0.55)":T.textL,fontFamily:FB,marginTop:4,textAlign:"right"}}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"10px 18px 14px",borderTop:`1px solid ${T.tborder}`,backgroundColor:"#fff",display:"flex",gap:9,flexShrink:0}}>
          <div style={{flex:1,backgroundColor:T.sand,borderRadius:22,padding:"10px 14px",fontSize:12,color:T.textL,fontFamily:FB}}>Escreva uma mensagem…</div>
          <div style={{width:40,height:40,borderRadius:"50%",backgroundColor:T.orange,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,boxShadow:`0 6px 18px ${T.orange}44`}}>
            <span style={{color:"#fff",fontSize:16}}>→</span>
          </div>
        </div>
      </div>
    );
  }

  // ── render ──
  let currentScreen;
  if (startLoggedIn) {
    // F2 — App do Inquilino: login screen OR área logada
    if (!loggedIn) {
      currentScreen = (
        <div style={{flex:1,display:"flex",flexDirection:"column",backgroundColor:T.cream}}>
          <SBar/>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"20px 26px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:28}}>
              <div style={{width:38,height:38,borderRadius:12,background:T.orange,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#fff",fontFamily:FB}}>C</div>
              <div>
                <div style={{fontSize:16,fontWeight:800,color:T.text,fontFamily:FD,letterSpacing:"-0.3px"}}>collegiate.</div>
                <div style={{fontSize:10,color:T.textL,fontFamily:FB}}>Área do Hóspede</div>
              </div>
            </div>
            <div style={{fontSize:22,fontWeight:800,color:T.text,fontFamily:FD,marginBottom:4,letterSpacing:"-0.3px"}}>Bem-vindo de volta</div>
            <div style={{fontSize:13,color:T.textL,fontFamily:FB,marginBottom:26,lineHeight:1.5}}>Entre com seus dados para acessar a área do hóspede.</div>
            <div style={{fontSize:10,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:6}}>CPF ou e-mail</div>
            <div style={{backgroundColor:"#fff",borderRadius:13,padding:"12px 15px",marginBottom:11,border:`1.5px solid ${T.tborder}`,fontSize:13,color:T.textL,fontFamily:FB}}>000.000.000-00</div>
            <div style={{fontSize:10,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:6}}>Senha</div>
            <div style={{backgroundColor:"#fff",borderRadius:13,padding:"12px 15px",marginBottom:8,border:`1.5px solid ${T.tborder}`,fontSize:13,color:T.textL,fontFamily:FB}}>••••••••</div>
            <div style={{textAlign:"right",marginBottom:20}}>
              <span style={{fontSize:11.5,color:T.orange,fontWeight:600,fontFamily:FB,cursor:"pointer"}}>Esqueci minha senha</span>
            </div>
            <div onClick={handleLogin} style={{background:T.orange,borderRadius:15,padding:"14px",textAlign:"center",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB,boxShadow:`0 10px 32px ${T.orange}55`}}>Entrar na minha conta</div>
            <div style={{marginTop:14,padding:"12px 14px",backgroundColor:T.sand,borderRadius:12,textAlign:"center"}}>
              <div style={{fontSize:11,color:T.textM,fontFamily:FB}}>Área exclusiva para <strong>hóspedes Collegiate</strong></div>
              <div style={{fontSize:10.5,color:T.textL,fontFamily:FB,marginTop:2}}>Ainda não tem reserva? Conheça nossos empreendimentos →</div>
            </div>
          </div>
        </div>
      );
    } else {
      const s={home:<HomeLoggedScreen/>,servicos:<ServicosScreen/>,perfil:<PerfilScreen/>,unidade:<UnidadeScreen/>,reservas:<ReservasScreen/>,meu_quarto:<MeuQuartoScreen/>,financeiro_col:<FinanceiroColScreen/>};
      currentScreen=s[screen]||<HomeLoggedScreen/>;
    }
  } else {
    // F3 — App de Leads: área deslogada (splash + vitrine + assistente)
    if(appPhase==="splash"){
      currentScreen=<SplashScreen/>;
    } else {
      const s={vitrine:<VitrineScreen/>,assistente:<AssistenteScreen/>,explorar:<VitrineScreen/>,entrar:(
        <div style={{flex:1,display:"flex",flexDirection:"column",backgroundColor:T.cream}}>
          <SBar/>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"20px 26px"}}>
            <div style={{fontSize:24,fontWeight:800,color:T.text,fontFamily:FD,marginBottom:5,letterSpacing:"-0.3px"}}>Bem-vindo de volta</div>
            <div style={{fontSize:13,color:T.textL,fontFamily:FB,marginBottom:26}}>Entre na sua conta Collegiate</div>
            <div style={{fontSize:10.5,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:6}}>CPF ou e-mail</div>
            <div style={{backgroundColor:"#fff",borderRadius:13,padding:"12px 15px",marginBottom:11,border:`1.5px solid ${T.tborder}`,fontSize:13,color:T.textL,fontFamily:FB}}>000.000.000-00</div>
            <div style={{fontSize:10.5,color:T.textL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:FB,marginBottom:6}}>Senha</div>
            <div style={{backgroundColor:"#fff",borderRadius:13,padding:"12px 15px",marginBottom:22,border:`1.5px solid ${T.tborder}`,fontSize:13,color:T.textL,fontFamily:FB}}>••••••••</div>
            <div onClick={handleLogin} style={{background:T.orange,borderRadius:15,padding:"14px",textAlign:"center",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:FB,boxShadow:`0 10px 32px ${T.orange}55`}}>Entrar</div>
          </div>
        </div>
      )};
      currentScreen=s[screen]||<VitrineScreen/>;
    }
  }

  const showNav = startLoggedIn ? true : appPhase!=="splash";

  // F2 — visual context: navy/dark tone to distinguish from F3
  const wrapBg = startLoggedIn
    ? "linear-gradient(160deg,#0A1628,#1A2445)"
    : "linear-gradient(160deg,#1A1A1A,#2A1A0A)";
  const glowColor = startLoggedIn ? "#3B45C8" : T.orange;

  return(
    <div style={{flex:1,overflowY:"auto",background:wrapBg,padding:"24px 20px 36px",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap'); ::-webkit-scrollbar{display:none}`}</style>

      {/* Phase badge */}
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{padding:"4px 12px",borderRadius:20,backgroundColor: startLoggedIn?"rgba(59,69,200,0.2)":"rgba(232,93,38,0.2)",border:`1px solid ${startLoggedIn?"rgba(59,69,200,0.4)":"rgba(232,93,38,0.4)"}`,fontSize:10,fontWeight:700,color:startLoggedIn?"#6B76DF":T.orange,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:FB}}>
          {startLoggedIn ? "Fase 2" : "Fase 3"}
        </div>
        <div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.35)",fontFamily:FB}}>
          {startLoggedIn ? "App do Inquilino · Área Logada" : "App de Leads · Área Deslogada"}
        </div>
      </div>

      {/* Scope callout */}
      <div style={{maxWidth:340,backgroundColor:"rgba(255,255,255,0.04)",border:`1px solid rgba(255,255,255,0.07)`,borderRadius:12,padding:"10px 14px",textAlign:"center"}}>
        <div style={{fontSize:10.5,color:"rgba(255,255,255,0.5)",fontFamily:FB,lineHeight:1.6}}>
          {startLoggedIn
            ? "🔐 Fluxo: Login → Home do hóspede → Financeiro · Manual · Infos do prédio · Chamados"
            : "🌐 Fluxo: Splash → Vitrine pública → Busca → Assistente → Detalhe do imóvel"}
        </div>
      </div>

      <div style={{width:340,background:"#111",borderRadius:50,padding:"13px 7px 17px",boxShadow:`0 50px 110px rgba(0,0,0,0.65),0 0 0 1px rgba(255,255,255,0.06),0 0 70px ${glowColor}22`}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:5}}>
          <div style={{width:100,height:28,backgroundColor:"#0A0A0A",borderRadius:16}}/>
        </div>
        <div style={{borderRadius:38,overflow:"hidden",height:640,backgroundColor:T.cream,display:"flex",flexDirection:"column"}}>
          {currentScreen}
          {showNav&&<NavBar/>}
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:10}}>
          <div style={{width:90,height:4,backgroundColor:"rgba(255,255,255,0.2)",borderRadius:2}}/>
        </div>
      </div>

      {/* Quick-nav pills */}
      <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",maxWidth:440}}>
        {(startLoggedIn
          ? [
              {l:"🔐 Login",    fn:()=>{setLoggedIn(false);}},
              {l:"🏠 Home",     fn:()=>{setLoggedIn(true);setScreen("home");}},
              {l:"💳 Serviços", fn:()=>{setLoggedIn(true);setScreen("servicos");}},
              {l:"📋 Unidade",  fn:()=>{setLoggedIn(true);setScreen("unidade");}},
              {l:"💳 Financeiro", fn:()=>{setLoggedIn(true);setScreen("financeiro_col");}},
              {l:"👤 Perfil",   fn:()=>{setLoggedIn(true);setScreen("perfil");}},
            ]
          : [
              {l:"🌟 Splash",   fn:()=>{setAppPhase("splash");}},
              {l:"🏠 Vitrine",  fn:()=>{setAppPhase("app");setScreen("vitrine");}},
              {l:"✦ Assistente",fn:()=>{setAppPhase("app");setScreen("assistente");setAstStep(-1);}},
              {l:"◎ Explorar",  fn:()=>{setAppPhase("app");setScreen("explorar");}},
            ]
        ).map(t=>(
          <div key={t.l} onClick={t.fn} style={{backgroundColor:"rgba(255,255,255,0.07)",borderRadius:20,padding:"6px 14px",fontSize:11,fontWeight:600,cursor:"pointer",color:"rgba(255,255,255,0.55)",fontFamily:FB,border:"1px solid rgba(255,255,255,0.09)",transition:"all 0.15s"}}>{t.l}</div>
        ))}
      </div>
    </div>
  );
}
const PASS = "menfe_e_guidance";

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: PRECIFICAÇÃO · MODULARIZAÇÃO
// ═══════════════════════════════════════════════════════════════════════════════

const FEAT_CATALOG = {
  menfe: {
    label: "App Investidor · Fase 1", color: "#1A2445", colorL: "#EEF0FC",
    items: [
      { id:"m01", name:"Mockup Inicial e Design System",            h:160 },
      { id:"m02", name:"Autenticação e Permissões",                 h:60  },
      { id:"m03", name:"Home — Patrimônio e Atividade Recente",     h:60  },
      { id:"m04", name:"Portfólio de Empreendimentos",              h:80  },
      { id:"m05", name:"Evolução de Obra em Tempo Real",            h:80  },
      { id:"m06", name:"Gestão Financeira e Dividendos",            h:120 },
      { id:"m07", name:"Hall de Lançamentos",                       h:60  },
      { id:"m08", name:"Botão 'Quero Investir' → WhatsApp/canal",   h:20  },
      { id:"m09", name:"Contratos — Download PDF",                  h:40  },
      { id:"m10", name:"Chat com Equipe Menfe",                     h:60  },
      { id:"m11", name:"Log de Atividades",                         h:40  },
      { id:"m12", name:"Notificações Push",                         h:80  },
      { id:"m13", name:"Perfil do Investidor",                      h:40  },
    ],
  },
  backoffice: {
    label: "Backoffice Admin · Fase 1", color: "#7C3AED", colorL: "#EDE9FE",
    items: [
      { id:"bo01", name:"Gerenciamento de permissões (RBAC)",       h:40  },
      { id:"bo02", name:"Gestão de empreendimentos",                h:120 },
      { id:"bo03", name:"Gestão de contratos",                      h:100 },
      { id:"bo04", name:"Painel financeiro do investidor",          h:160 },
      { id:"bo05", name:"Gestão de obras e progresso",              h:160 },
      { id:"bo06", name:"Gestão de investidores (CRUD)",            h:80  },
      { id:"bo07", name:"Painel de leads e lançamentos",            h:80  },
      { id:"bo08", name:"Configuração canal WhatsApp/externo",      h:40  },
      { id:"bo09", name:"Notificações push via painel",             h:40  },
      { id:"bo10", name:"Logs de acessos e atividades",             h:20  },
    ],
  },
  collegiate: {
    label: "App Inquilino · Fase 2 (Logado)", color: "#C44A18", colorL: "#FEF0EB",
    items: [
      { id:"c01", name:"Mockup e Design System F2",                 h:120 },
      { id:"c02", name:"Autenticação e Permissões — Inquilino",     h:60  },
      { id:"c03", name:"Home do Inquilino e Resumo do Contrato",    h:60  },
      { id:"c04", name:"Painel Financeiro — Aluguel e Histórico",   h:80  },
      { id:"c05", name:"Segunda Via Boleto / Pix",                  h:40  },
      { id:"c06", name:"Manual Digital do Imóvel",                  h:60  },
      { id:"c07", name:"Informações do Prédio e Portaria",          h:40  },
      { id:"c08", name:"Chamados de Manutenção",                    h:40  },
      { id:"c09", name:"Avisos e Notificações do Condomínio",       h:80  },
    ],
  },
  leads: {
    label: "App Leads · Fase 3 (Deslogado)", color: "#B45309", colorL: "#FEF3C7",
    items: [
      { id:"l01", name:"Mockup e Design System F3",                 h:120 },
      { id:"l02", name:"Vitrine Pública de Empreendimentos",        h:80  },
      { id:"l03", name:"Busca com Filtros (cidade, tipo, preço)",   h:80  },
      { id:"l04", name:"Detalhe do Empreendimento (galeria, mapa)", h:80  },
      { id:"l05", name:"Assistente de Busca (5 perguntas)",         h:60  },
      { id:"l06", name:"Fluxo de Booking e Reserva de Unidade",     h:100 },
      { id:"l07", name:"Cadastro de Lead e Conversão",              h:60  },
      { id:"l08", name:"Integração CRM e Equipe Comercial",         h:60  },
      { id:"l09", name:"Notificações e Follow-up de Leads",         h:40  },
    ],
  },
  backend: {
    label: "Backend · NestJS + PostgreSQL", color: "#2D7D46", colorL: "#E6F4EE",
    items: [
      { id:"b01", name:"Autenticação e RBAC (3 perfis)",             h:60  },
      { id:"b02", name:"CRUD base — empreendimentos e usuários",     h:40  },
      { id:"b03", name:"Infraestrutura e DevOps",                    h:80  },
      { id:"b04", name:"Sistema de venda de empreendimentos",        h:160 },
      { id:"b05", name:"Gestão financeira — investidor",             h:160 },
      { id:"b06", name:"Integração bancária (Pix, Boleto)",          h:160 },
      { id:"b07", name:"Evolução de obra e patrimônio",              h:80  },
      { id:"b08", name:"Webhook WhatsApp / canal de leads",          h:40  },
      { id:"b09", name:"Gestão financeira — hóspede",              h:120 },
      { id:"b10", name:"Manual do imóvel e informações do prédio",   h:60  },
      { id:"b11", name:"Sistema de booking (leads F3)",              h:200 },
      { id:"b12", name:"Busca e filtros (leads F3)",                 h:80  },
      { id:"b13", name:"Sistema de Chat",                            h:160 },
      { id:"b14", name:"Notificações push (FCM)",                    h:30  },
      { id:"b15", name:"Contratos",                                  h:20  },
      { id:"b16", name:"Logs e auditoria",                           h:40  },
    ],
  },
};

// Default phase assignments (aligned with new roadmap)
const DEFAULT_PHASES = {
  // App Investidor F1
  m01:"f1",m02:"f1",m03:"f1",m04:"f1",m05:"f1",m06:"f1",m07:"f1",m08:"f1",m09:"f1",m10:"f1",m11:"f1",m12:"f1",m13:"f1",
  // Backoffice F1
  bo01:"f1",bo02:"f1",bo03:"f1",bo04:"f1",bo05:"f1",bo06:"f1",bo07:"f1",bo08:"f1",bo09:"f1",bo10:"f1",
  // App Inquilino F2
  c01:"f2",c02:"f2",c03:"f2",c04:"f2",c05:"f2",c06:"f2",c07:"f2",c08:"f2",c09:"f2",
  // App Leads F3
  l01:"f3",l02:"f3",l03:"f3",l04:"f3",l05:"f3",l06:"f3",l07:"f3",l08:"f3",l09:"f3",
  // Backend — split across phases
  b01:"f1",b02:"f1",b03:"f1",b04:"f1",b05:"f1",b06:"f1",b07:"f1",b08:"f1",
  b09:"f2",b10:"f2",b13:"f1",b14:"f1",b15:"f1",
  b11:"f3",b12:"f3",b16:"f2",
};

const PHASE_META = {
  f1: { label:"Fase 1", sub:"App Investidor + Backoffice", color:"#2D7D46", bg:"#E6F4EE", border:"#A7F3D0" },
  f2: { label:"Fase 2", sub:"App Inquilino · Logado",      color:"#1A2445", bg:"#EEF0FC", border:"#A5B4FC" },
  f3: { label:"Fase 3", sub:"App Leads · Busca & Booking", color:"#C44A18", bg:"#FEF0EB", border:"#FCA5A5" },
  none:{ label:"Fora do Escopo", sub:"Não incluir",         color:"#9CA3AF", bg:"#F9FAFB", border:"#E5E7EB" },
};

const ALL_ITEMS = Object.values(FEAT_CATALOG).flatMap(p => p.items);

function PagePricing() {
  const [phases, setPhases] = useState(() => ({ ...DEFAULT_PHASES }));
  const [rate, setRate] = useState(180);
  const [tab, setTab] = useState("menfe");
  const [margin, setMargin] = useState(25);

  function setPhase(id, ph) {
    setPhases(prev => ({ ...prev, [id]: ph }));
  }

  function resetToDefault() {
    setPhases({ ...DEFAULT_PHASES });
  }

  function calcPhase(phKey) {
    const items = ALL_ITEMS.filter(f => phases[f.id] === phKey);
    const hBase = items.reduce((s, f) => s + f.h, 0);
    const hFull = Math.round(hBase * (1 + margin / 100));
    const price = hFull * rate;
    const months = Math.ceil(hFull / 480); // ~480h/mês capacidade da equipe
    return { items, hBase, hFull, price, months, count: items.length };
  }

  function calcTotal() {
    const included = ALL_ITEMS.filter(f => phases[f.id] !== "none");
    const hBase = included.reduce((s, f) => s + f.h, 0);
    const hFull = Math.round(hBase * (1 + margin / 100));
    const price = hFull * rate;
    return { hBase, hFull, price };
  }

  const fmtH = n => n.toLocaleString("pt-BR") + "h";
  const fmtR = n => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const f1 = calcPhase("f1");
  const f2 = calcPhase("f2");
  const f3 = calcPhase("f3");
  const total = calcTotal();
  const noneCount = ALL_ITEMS.filter(f => phases[f.id] === "none").length;

  const TABS = [
    { k:"menfe",      l:"App Investidor F1" },
    { k:"backoffice", l:"Backoffice F1"     },
    { k:"collegiate", l:"App Inquilino F2"  },
    { k:"leads",      l:"App Leads F3"      },
    { k:"backend",    l:"Backend"           },
  ];

  function FeatureRow({ feat, prodColor }) {
    const ph = phases[feat.id] || "none";
    return (
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 14px", borderBottom:`0.5px solid ${C.border}`, backgroundColor: ph==="none"?"#FAFAFA":C.white }}>
        <div style={{ flex:1, fontSize:12.5, color: ph==="none"?C.gray400:C.gray800, fontWeight:500, textDecoration: ph==="none"?"line-through":"none" }}>
          {feat.name}
        </div>
        <div style={{ fontSize:10.5, fontWeight:700, color:C.gray400, minWidth:36, textAlign:"right" }}>
          {feat.h}h
        </div>
        <div style={{ display:"flex", gap:3, flexShrink:0 }}>
          {(["f1","f2","f3","none"]).map(p => {
            const meta = PHASE_META[p];
            const active = ph === p;
            return (
              <div key={p} onClick={() => setPhase(feat.id, p)} style={{
                padding:"3px 8px", borderRadius:5, fontSize:10, fontWeight:700, cursor:"pointer",
                backgroundColor: active ? meta.color : "#F3F4F6",
                color: active ? "#fff" : "#9CA3AF",
                border: `1px solid ${active ? meta.color : "#E5E7EB"}`,
                transition:"all 0.12s",
                minWidth: p==="none" ? 20 : 26, textAlign:"center",
              }}>
                {p==="none" ? "—" : p.toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const prod = FEAT_CATALOG[tab];

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", backgroundColor:C.offwhite }}>

      {/* ── Topbar ── */}
      <div style={{ padding:"11px 22px", backgroundColor:C.white, borderBottom:`0.5px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div>
          <div style={{ fontSize:13.5, fontWeight:700, color:C.gray800 }}>Modularização de Escopo</div>
          <div style={{ fontSize:11, color:C.gray400, marginTop:1 }}>Selecione as features por fase · cálculo em tempo real</div>
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          {/* Rate input */}
          <div style={{ display:"flex", alignItems:"center", gap:7, backgroundColor:C.gray100, borderRadius:8, padding:"6px 12px" }}>
            <span style={{ fontSize:11, color:C.gray600, fontWeight:600 }}>R$/h</span>
            <input
              type="number" min={50} max={1000} step={10}
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
              style={{ width:56, border:"none", background:"transparent", fontSize:13, fontWeight:700, color:C.gray800, textAlign:"right", outline:"none" }}
            />
          </div>
          {/* Margin input */}
          <div style={{ display:"none" }}>
            <input type="number" value={margin} onChange={e => setMargin(Number(e.target.value))} />
          </div>
          <button onClick={resetToDefault} style={{ fontSize:11, fontWeight:600, color:C.gray600, border:`0.5px solid ${C.border}`, background:C.white, borderRadius:7, padding:"6px 12px", cursor:"pointer" }}>
            ↺ Resetar
          </button>
        </div>
      </div>

      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

        {/* ── Feature list ── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Product tabs */}
          <div style={{ display:"flex", gap:0, backgroundColor:C.white, borderBottom:`0.5px solid ${C.border}`, flexShrink:0 }}>
            {TABS.map(t => {
              const pc = FEAT_CATALOG[t.k];
              const active = tab === t.k;
              const phCount = pc.items.filter(f => phases[f.id] !== "none").length;
              return (
                <div key={t.k} onClick={() => setTab(t.k)} style={{ padding:"10px 18px", cursor:"pointer", borderBottom: active ? `2px solid ${pc.color}` : "2px solid transparent", display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:2, backgroundColor:pc.color, flexShrink:0 }} />
                  <span style={{ fontSize:12, fontWeight: active ? 700 : 500, color: active ? pc.color : C.gray400 }}>{t.l}</span>
                  <span style={{ fontSize:10, backgroundColor: active ? pc.colorL : C.gray100, color: active ? pc.color : C.gray400, borderRadius:10, padding:"1px 7px", fontWeight:600 }}>
                    {phCount}/{pc.items.length}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Feature list */}
          <div style={{ flex:1, overflowY:"auto" }}>
            {/* Column headers */}
            <div style={{ display:"flex", alignItems:"center", padding:"7px 14px", borderBottom:`0.5px solid ${C.border}`, backgroundColor:C.gray50 }}>
              <div style={{ flex:1, fontSize:9.5, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.07em" }}>Feature</div>
              <div style={{ fontSize:9.5, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.07em", minWidth:36, textAlign:"right", marginRight:10 }}>Horas</div>
              <div style={{ display:"flex", gap:3, minWidth:128 }}>
                {["F1","F2","F3","—"].map(l => (
                  <div key={l} style={{ fontSize:9, fontWeight:700, color:C.gray400, width: l==="—" ? 20 : 26, textAlign:"center" }}>{l}</div>
                ))}
              </div>
            </div>

            {/* Product section header */}
            <div style={{ padding:"8px 14px", display:"flex", alignItems:"center", gap:8, backgroundColor: prod.colorL, borderBottom:`0.5px solid ${C.border}` }}>
              <div style={{ width:24, height:24, borderRadius:6, backgroundColor:prod.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:"#fff" }}>
                {tab.substring(0,2).toUpperCase()}
              </div>
              <span style={{ fontSize:12, fontWeight:700, color:prod.color }}>{prod.label}</span>
              <span style={{ fontSize:10.5, color:prod.color, marginLeft:"auto" }}>
                {fmtH(prod.items.filter(f=>phases[f.id]!=="none").reduce((s,f)=>s+f.h,0))} selecionadas
              </span>
            </div>

            {prod.items.map(feat => (
              <FeatureRow key={feat.id} feat={feat} prodColor={prod.color} />
            ))}

            {/* Quick-select all for this product */}
            <div style={{ padding:"10px 14px", display:"flex", gap:8, backgroundColor:C.white, borderBottom:`0.5px solid ${C.border}` }}>
              <span style={{ fontSize:11, color:C.gray400, marginRight:4 }}>Selecionar todos como:</span>
              {["f1","f2","f3","none"].map(p => {
                const meta = PHASE_META[p];
                return (
                  <div key={p} onClick={() => prod.items.forEach(f => setPhase(f.id, p))} style={{ fontSize:10, fontWeight:700, color:meta.color, backgroundColor:meta.bg, border:`1px solid ${meta.border}`, borderRadius:5, padding:"3px 10px", cursor:"pointer" }}>
                    {p==="none" ? "— Nenhuma" : meta.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Summary panel ── */}
        <div style={{ width:280, minWidth:280, borderLeft:`0.5px solid ${C.border}`, backgroundColor:C.white, display:"flex", flexDirection:"column", overflowY:"auto" }}>

          {/* Phase cards */}
          {[f1,f2,f3].map((ph,i) => {
            const key = ["f1","f2","f3"][i];
            const meta = PHASE_META[key];
            return (
              <div key={key} style={{ borderBottom:`0.5px solid ${C.border}` }}>
                <div style={{ padding:"12px 16px 10px", borderLeft:`3px solid ${meta.color}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:meta.color, textTransform:"uppercase", letterSpacing:"0.07em" }}>{meta.label}</div>
                      <div style={{ fontSize:10.5, color:C.gray400, marginTop:1 }}>{meta.sub}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:9.5, color:C.gray400 }}>{ph.count} features</div>
                      <div style={{ fontSize:12, fontWeight:700, color:C.gray800, marginTop:1 }}>{ph.months} {ph.months===1?"mês":"meses"}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <span style={{ fontSize:10.5, color:C.gray400 }}>Total de horas</span>
                    <span style={{ fontSize:11, fontWeight:700, color:C.gray800 }}>{fmtH(ph.hFull)}</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height:4, backgroundColor:C.gray100, borderRadius:2, marginBottom:8 }}>
                    <div style={{ height:"100%", backgroundColor:meta.color, borderRadius:2, width:`${total.hFull > 0 ? (ph.hFull/total.hFull)*100 : 0}%`, transition:"width 0.3s" }} />
                  </div>
                  <div style={{ backgroundColor:meta.bg, border:`1px solid ${meta.border}`, borderRadius:8, padding:"8px 12px", textAlign:"center" }}>
                    <div style={{ fontSize:9.5, color:meta.color, fontWeight:600, marginBottom:2 }}>Custo estimado</div>
                    <div style={{ fontSize:16, fontWeight:800, color:meta.color }}>{fmtR(ph.price)}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Out of scope */}
          {noneCount > 0 && (
            <div style={{ padding:"10px 16px", borderBottom:`0.5px solid ${C.border}` }}>
              <div style={{ fontSize:10, color:C.gray400, fontWeight:600 }}>{noneCount} feature{noneCount>1?"s":""} fora do escopo</div>
            </div>
          )}

          {/* Grand total */}
          <div style={{ marginTop:"auto", padding:"16px", backgroundColor:C.navy }}>
            <div style={{ fontSize:9.5, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Total do Projeto</div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)" }}>Total de horas</span>
              <span style={{ fontSize:11, fontWeight:700, color:C.white }}>{fmtH(total.hFull)}</span>
            </div>
            <div style={{ height:0.5, backgroundColor:"rgba(255,255,255,0.1)", marginBottom:12 }} />
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:600, marginBottom:5 }}>Valor total estimado</div>
            <div style={{ fontSize:24, fontWeight:800, color:C.gold, letterSpacing:"-0.5px", lineHeight:1 }}>{fmtR(total.price)}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:4 }}>a R$ {rate}/h</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageLogin({ onSuccess }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [show, setShow] = useState(false);

  function handleSubmit() {
    if (pw === PASS) { onSuccess(); } else {
      setError(true); setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyL} 100%)`, fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}.shake{animation:shake 0.45s ease;}`}</style>
      <div className={shake ? "shake" : ""} style={{ backgroundColor: "rgba(255,255,255,0.03)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "40px 36px", width: 360, boxShadow: "0 40px 80px rgba(0,0,0,0.4)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${C.blueM}, ${C.navyL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>M</div>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${C.coll}, ${C.collD})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>C</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.white, letterSpacing: "-0.3px", marginBottom: 4 }}>menfe · collegiate</div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>Dashboard MVP · Acesso Restrito</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 7 }}>Senha de acesso</div>
            <div style={{ position: "relative" }}>
              <input type={show ? "text" : "password"} value={pw} onChange={e => { setPw(e.target.value); setError(false); }} onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }} placeholder="••••••••••••" autoFocus
                style={{ width: "100%", padding: "11px 40px 11px 14px", border: `1px solid ${error ? C.red : "rgba(255,255,255,0.12)"}`, borderRadius: 10, fontSize: 14, color: C.white, backgroundColor: error ? "rgba(220,38,38,0.1)" : "rgba(255,255,255,0.06)", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
              <button onClick={() => setShow(v => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>{show ? "🙈" : "👁"}</button>
            </div>
            {error && <div style={{ marginTop: 6, fontSize: 11, color: "#FCA5A5", fontWeight: 500 }}>Senha incorreta. Tente novamente.</div>}
          </div>
          <button onClick={handleSubmit} style={{ padding: "12px", border: "none", borderRadius: 10, background: `linear-gradient(135deg, ${C.blueM}, ${C.navyL})`, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.02em" }}>
            Acessar documentação →
          </button>
        </div>
        <div style={{ marginTop: 24, textAlign: "center", fontSize: 10.5, color: "rgba(255,255,255,0.2)" }}>
          menfe · collegiate © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: BACKOFFICE PROTOTYPE (Phase 1 — Admin Panel)
// ═══════════════════════════════════════════════════════════════════════════════
function PagePrototypeBackoffice() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const MENU = [
    { k:"dashboard",    icon:"📊", label:"Dashboard" },
    { k:"investidores", icon:"👥", label:"Investidores" },
    { k:"empreend",     icon:"🏗️", label:"Empreendimentos" },
    { k:"obras",        icon:"📈", label:"Evolução de Obra" },
    { k:"financeiro",   icon:"💰", label:"Financeiro" },
    { k:"contratos",    icon:"📄", label:"Contratos" },
    { k:"logs",         icon:"🔍", label:"Logs & Auditoria" },
  ];

  const stats = [
    { label:"Investidores Ativos",  value:"142",        delta:"+8 este mês",   color:"#1A2445", bg:"#EEF0FC" },
    { label:"Empreendimentos",      value:"6",          delta:"3 em obra",     color:"#2D7D46", bg:"#E6F4EE" },
    { label:"Patrimônio Total",     value:"R$ 48,2M",   delta:"↑ 12,4% YTD",  color:"#7C3AED", bg:"#EDE9FE" },
  ];

  const investidores = [
    { nome:"Ricardo Costa",    cpf:"***.456.789-**", empreend:3, patrimonio:"R$ 3.120.000", status:"Ativo",   desde:"2021" },
    { nome:"Ana Souza",        cpf:"***.234.567-**", empreend:2, patrimonio:"R$ 1.850.000", status:"Ativo",   desde:"2022" },
    { nome:"Marcos Oliveira",  cpf:"***.678.901-**", empreend:1, patrimonio:"R$ 740.000",   status:"Ativo",   desde:"2023" },
    { nome:"Julia Ferreira",   cpf:"***.890.123-**", empreend:2, patrimonio:"R$ 2.290.000", status:"Ativo",   desde:"2021" },
    { nome:"Carlos Mendes",    cpf:"***.012.345-**", empreend:1, patrimonio:"R$ 490.000",   status:"Inativo", desde:"2022" },
  ];

  const empreendimentos = [
    { nome:"Collegiate Housi SJDR",     cidade:"São João del-Rei · MG", status:"Entregue",    obra:100, unidades:64,  vgv:"R$ 12,4M" },
    { nome:"Collegiate Uberaba",        cidade:"Uberaba · MG",          status:"Em Obra",     obra:74,  unidades:128, vgv:"R$ 18,2M" },
    { nome:"Collegiate Pouso Alegre",   cidade:"Pouso Alegre · MG",     status:"Em Obra",     obra:42,  unidades:96,  vgv:"R$ 9,8M" },
    { nome:"Collegiate Varginha",       cidade:"Varginha · MG",         status:"Lançamento",  obra:8,   unidades:80,  vgv:"R$ 8,1M" },
    { nome:"Collegiate Uberaba 2",      cidade:"Uberaba · MG",          status:"Pré-venda",   obra:0,   unidades:128, vgv:"R$ 21,5M" },
  ];

  const statusColor = { "Ativo":"#059669", "Inativo":"#9CA3AF", "Entregue":"#059669", "Em Obra":"#1A2445", "Lançamento":"#C9A84C", "Pré-venda":"#7C3AED", "Qualificado":"#059669", "Em contato":"#1A2445", "Novo":"#9CA3AF" };
  const statusBg =    { "Ativo":"#D1FAE5", "Inativo":"#F3F4F6", "Entregue":"#D1FAE5", "Em Obra":"#EEF0FC", "Lançamento":"#FDF3DC", "Pré-venda":"#EDE9FE", "Qualificado":"#D1FAE5", "Em contato":"#EEF0FC", "Novo":"#F3F4F6" };

  function renderContent() {
    if (activeMenu === "dashboard") return (
      <div style={{ padding:24, display:"flex", flexDirection:"column", gap:18 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          {stats.map(s => (
            <div key={s.label} style={{ backgroundColor:C.white, borderRadius:12, padding:"16px 18px", border:`0.5px solid ${C.border}`, borderTop:`3px solid ${s.color}` }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>{s.label}</div>
              <div style={{ fontSize:26, fontWeight:800, color:C.gray800, letterSpacing:"-0.5px", marginBottom:4 }}>{s.value}</div>
              <div style={{ fontSize:11, color:s.color, fontWeight:600, backgroundColor:s.bg, display:"inline-block", padding:"2px 8px", borderRadius:6 }}>{s.delta}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div style={{ backgroundColor:C.white, borderRadius:12, padding:"18px 20px", border:`0.5px solid ${C.border}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Empreendimentos — Progresso de Obra</div>
            {empreendimentos.filter(e=>e.obra>0).map(e => (
              <div key={e.nome} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:12, fontWeight:600, color:C.gray800 }}>{e.nome}</span>
                  <span style={{ fontSize:11, fontWeight:700, color: e.obra===100 ? C.green : C.blue }}>{e.obra}%</span>
                </div>
                <div style={{ height:5, backgroundColor:C.gray100, borderRadius:3 }}>
                  <div style={{ width:`${e.obra}%`, height:"100%", background: e.obra===100 ? `linear-gradient(90deg,${C.green},#34D399)` : `linear-gradient(90deg,${C.blue},#6B76DF)`, borderRadius:3, transition:"width 0.4s" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor:C.white, borderRadius:12, padding:"18px 20px", border:`0.5px solid ${C.border}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Investidores Recentes</div>
            {investidores.slice(0,4).map((inv,i) => (
              <div key={inv.nome} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom: i<3?`0.5px solid ${C.border}`:"none" }}>
                <div style={{ width:32, height:32, borderRadius:9, backgroundColor:"#EEF0FC", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:C.navyL, flexShrink:0 }}>{inv.nome[0]}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:C.gray800 }}>{inv.nome}</div>
                  <div style={{ fontSize:10, color:C.gray400 }}>{inv.empreend} empreend. · desde {inv.desde}</div>
                </div>
                <span style={{ fontSize:9.5, fontWeight:700, color:statusColor[inv.status], backgroundColor:statusBg[inv.status], padding:"3px 8px", borderRadius:6 }}>{inv.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    if (activeMenu === "investidores") return (
      <div style={{ padding:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontSize:14, fontWeight:700, color:C.gray800 }}>Investidores Cadastrados</div>
          <button style={{ padding:"8px 16px", backgroundColor:C.navyL, color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>+ Novo Investidor</button>
        </div>
        <div style={{ backgroundColor:C.white, borderRadius:12, border:`0.5px solid ${C.border}`, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1.5fr 1fr 1fr", padding:"10px 18px", backgroundColor:C.gray50, borderBottom:`0.5px solid ${C.border}` }}>
            {["Nome","CPF","Empreend.","Patrimônio","Status","Desde"].map(h=>(
              <div key={h} style={{ fontSize:10, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.07em" }}>{h}</div>
            ))}
          </div>
          {investidores.map((inv,i) => (
            <div key={inv.nome} style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1.5fr 1fr 1fr", padding:"12px 18px", borderBottom:i<investidores.length-1?`0.5px solid ${C.border}`:"none", alignItems:"center" }}>
              <div style={{ fontSize:13, fontWeight:600, color:C.gray800 }}>{inv.nome}</div>
              <div style={{ fontSize:12, color:C.gray600, fontFamily:"monospace" }}>{inv.cpf}</div>
              <div style={{ fontSize:12, color:C.gray600 }}>{inv.empreend}</div>
              <div style={{ fontSize:12, fontWeight:700, color:C.navyL }}>{inv.patrimonio}</div>
              <span style={{ fontSize:10, fontWeight:700, color:statusColor[inv.status], backgroundColor:statusBg[inv.status], padding:"3px 8px", borderRadius:6, display:"inline-block" }}>{inv.status}</span>
              <div style={{ fontSize:12, color:C.gray400 }}>{inv.desde}</div>
            </div>
          ))}
        </div>
      </div>
    );
    if (activeMenu === "empreend") return (
      <div style={{ padding:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontSize:14, fontWeight:700, color:C.gray800 }}>Empreendimentos Cadastrados</div>
          <button style={{ padding:"8px 16px", backgroundColor:"#2D7D46", color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>+ Novo Empreendimento</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {empreendimentos.map(e => (
            <div key={e.nome} style={{ backgroundColor:C.white, borderRadius:12, border:`0.5px solid ${C.border}`, padding:"16px 20px", display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ width:44, height:44, borderRadius:11, background:`linear-gradient(135deg,${C.navyL},${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🏗️</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:13.5, fontWeight:700, color:C.gray800 }}>{e.nome}</span>
                  <span style={{ fontSize:9.5, fontWeight:700, color:statusColor[e.status], backgroundColor:statusBg[e.status], padding:"2px 8px", borderRadius:6 }}>{e.status}</span>
                </div>
                <div style={{ fontSize:11, color:C.gray400, marginBottom:8 }}>📍 {e.cidade} · {e.unidades} unidades · {e.vgv}</div>
                {e.obra > 0 && (
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ flex:1, height:4, backgroundColor:C.gray100, borderRadius:2 }}>
                      <div style={{ width:`${e.obra}%`, height:"100%", background:`linear-gradient(90deg,${C.blue},#6B76DF)`, borderRadius:2 }} />
                    </div>
                    <span style={{ fontSize:10, fontWeight:700, color:C.blue, minWidth:30 }}>{e.obra}%</span>
                  </div>
                )}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button style={{ padding:"6px 12px", border:`1px solid ${C.border}`, borderRadius:7, fontSize:11, color:C.gray600, background:C.white, cursor:"pointer" }}>Editar</button>
                <button style={{ padding:"6px 12px", border:"none", borderRadius:7, fontSize:11, color:"#fff", background:C.navyL, cursor:"pointer" }}>Ver detalhes</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    // Default placeholder for other menus
    const menuItem = MENU.find(m=>m.k===activeMenu);
    return (
      <div style={{ padding:40, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flex:1 }}>
        <div style={{ fontSize:36, marginBottom:16 }}>{menuItem?.icon}</div>
        <div style={{ fontSize:18, fontWeight:700, color:C.gray800, marginBottom:8 }}>{menuItem?.label}</div>
        <div style={{ fontSize:13, color:C.gray400, textAlign:"center", maxWidth:360 }}>Este módulo do backoffice será desenvolvido na Fase 1. Conteúdo e interações completos disponíveis após implementação.</div>
      </div>
    );
  }

  return (
    <div style={{ flex:1, display:"flex", overflow:"hidden", backgroundColor:C.offwhite }}>
      {/* Left sidebar */}
      <div style={{ width:200, minWidth:200, backgroundColor:C.white, borderRight:`0.5px solid ${C.border}`, display:"flex", flexDirection:"column", overflowY:"auto" }}>
        <div style={{ padding:"16px 14px 10px" }}>
          <div style={{ fontSize:9.5, fontWeight:700, color:C.gray400, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Backoffice · Admin</div>
        </div>
        {MENU.map(m => (
          <div key={m.k} onClick={()=>setActiveMenu(m.k)} style={{ display:"flex", alignItems:"center", gap:9, padding:"9px 14px", margin:"1px 8px", borderRadius:8, cursor:"pointer", backgroundColor:activeMenu===m.k?"#EEF0FC":"transparent", color:activeMenu===m.k?C.navyL:C.gray600, fontWeight:activeMenu===m.k?700:400, fontSize:12.5, transition:"all 0.12s" }}>
            <span style={{ fontSize:15 }}>{m.icon}</span>
            {m.label}
          </div>
        ))}
        <div style={{ marginTop:"auto", padding:"12px 14px", borderTop:`0.5px solid ${C.border}` }}>
          <div style={{ fontSize:10, color:C.gray400, fontWeight:600 }}>Protótipo Fase 1</div>
          <div style={{ fontSize:10, color:C.gray400, marginTop:2 }}>Backoffice · NextJS Web</div>
        </div>
      </div>
      {/* Main area */}
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"11px 22px", backgroundColor:C.white, borderBottom:`0.5px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.gray800 }}>{MENU.find(m=>m.k===activeMenu)?.label}</div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:10, color:C.gray400 }}>Protótipo interativo · Backoffice F1</div>
            <div style={{ width:28, height:28, borderRadius:8, backgroundColor:"#EDE9FE", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#7C3AED" }}>AD</div>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function MenfeCollegiateDoc() {
  const [authed, setAuthed] = useState(false);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    document.title = "menfe · Dashboard MVP";
  }, []);

  if (!authed) return <PageLogin onSuccess={() => setAuthed(true)} />;

  const pages = {
    overview:          <PageOverview />,
    f1_arch:           <PageArchitecture phase="F1" />,
    f1_roadmap:        <PageRoadmapPhase phase="F1" />,
    f1_team:           <PageTeamPhase phase="F1" />,
    proto_menfe:       <PagePrototypeMenfe />,
    proto_backoffice:  <PagePrototypeBackoffice />,
    f2_arch:           <PageArchitecture phase="F2" />,
    f2_roadmap:        <PageRoadmapPhase phase="F2" />,
    f2_team:           <PageTeamPhase phase="F2" />,
    proto_collegiate:  <PagePrototypeCollegiate startLoggedIn={true} />,
    f3_arch:           <PageArchitecture phase="F3" />,
    f3_roadmap:        <PageRoadmapPhase phase="F3" />,
    f3_team:           <PageTeamPhase phase="F3" />,
    proto_leads:       <PagePrototypeLeadsApp />,
  };

  return (
    <div style={{
      display: "flex", height: "100vh", minHeight: 600,
      backgroundColor: C.offwhite, fontFamily: "'DM Sans','Segoe UI',sans-serif",
      fontSize: 13, overflow: "hidden",
    }}>
      <Sidebar active={active} setActive={setActive} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar active={active} />
        {pages[active]}
      </div>
    </div>
  );
}
