/* ==========================================================================
   LENSHEAD STUDIO — interaction layer
   no dependencies. one rAF loop. degrades without JS.
   ========================================================================== */
(function () {
  "use strict";

  var html = document.documentElement;
  var body = document.body;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var lerp  = function (a, b, t) { return a + (b - a) * t; };
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE    = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ======================================================================
     1. i18n
     ====================================================================== */
  var I18N = {
    zh: {
      a11y_skip: "跳到主要内容",
      loader_hint: "显影中",
      nav_work: "作品", nav_studio: "工作室", nav_founder: "主理人",
      nav_services: "服务", nav_contact: "联系", nav_cta: "联系",
      hero_cjk: "拍摄光。",
      hero_sub: "东京摄影工作室。我们拍摄的不是主体，而是落在主体上的光。",
      hero_scroll: "向下滚动",
      mf_label: "宣言",
      mf_text: "光不只是照亮。\n它定义主体。",
      mf_note: "东京 · 自 2018 年",
      wk_label: "精选作品",
      wk_cat1: "静物 · 商业", wk_cat2: "时尚 · 编辑", wk_cat3: "人像 · 自然光",
      wk_cat4: "现场 · 演出", wk_cat5: "空间 · 建筑", wk_cat6: "静物 · 陈设",
      wk_end: "还有更多，在档案里。", wk_end_cta: "索取完整作品集",
      ix_label: "档案索引", ix_col1: "编号 / 作品", ix_col2: "类型", ix_col3: "年份",
      st_label: "工作室",
      st_title: "一间为光而存在的<br>东京工作室",
      st_p1: "Lenshead 成立于 2018 年。我们为品牌与个人提供从概念、拍摄到后期的完整影像服务——从一张产品图，到一整个品牌的视觉语言。",
      st_p2: "团队由摄影师、灯光师与修图师组成。我们不追求「好看」，我们追求准确：准确的光，准确的质感，准确的沉默。",
      st_s1: "年 · 行业经验", st_s2: "项目案例", st_s3: "合作品牌", st_s4: "东京 · 常驻团队",
      fd_label: "主理人",
      fd_caption: "第一次握住麦克风。那年他还不知道，二十年后自己会用镜头讲同样的故事。",
      fd_role: "创始人 · 首席摄影师 / 视觉导演",
      fd_quote: "「影像不是记录，是容器。」",
      fd_bio: "楊伯虎（Young）是 Lenshead Studio 的创始人。他相信影像是情感与叙事的容器，擅长以电影化的语言捕捉人物最真实的瞬间——这也是他把工作室命名为「镜头之首」的原因：一切从光进入镜头的那一刻开始。",
      fd_c1: "毕业于美国天普大学克莱因传媒学院（Klein College of Media and Communication），主攻影像叙事与导演。",
      fd_c2: "早年投身电影创作，参与多部院线及独立电影的拍摄与制作。",
      fd_c3: "参与制作的影片《Burning Sea》入围戛纳电影节附属展映单元。",
      fd_c4: "回国后深耕商业与人像摄影，曾为多位粉丝量破百万的头部创作者掌镜。",
      sv_label: "服务",
      s1_title: "商业摄影", s1_desc: "品牌形象片、产品广告、企业宣传册拍摄，助力品牌视觉升级。",
      s2_title: "人像摄影", s2_desc: "个人写真、职业形象照、艺人宣传照，展现最真实动人的你。",
      s3_title: "时尚摄影", s3_desc: "服装画册、时尚编辑、Lookbook 拍摄，定义潮流视觉标准。",
      s4_title: "活动纪实", s4_desc: "发布会、年会、展览现场记录，捕捉每一个精彩瞬间。",
      s5_title: "空间摄影", s5_desc: "建筑外观、室内空间、酒店民宿摄影，呈现空间设计之美。",
      s6_title: "后期制作", s6_desc: "专业调色、精修、合成服务，让每一张照片都达到出版级品质。",
      ct_label: "联系",
      ct_desc: "商业合作、杂志约稿、个人创作 —— 告诉我们你想拍什么。",
      ct_avail: "2027 Q1 档期开放中",
      ct_email_label: "邮箱", ct_studio_label: "工作室", ct_studio_val: "日本 · 东京",
      ct_hours_label: "营业时间", ct_hours_val: "周一至周五 10:00–19:00 (JST)",
      ct_social_label: "社交",
      form_name: "姓名", form_email: "邮箱", form_subject: "主题",
      form_message: "留言", form_submit: "发送", form_note: "提交后我们会通过邮件尽快回复。",
      form_required: "请填写姓名、邮箱与留言。",
      form_email_invalid: "请输入有效的邮箱地址（例如 you@example.com）。",
      form_sending: "发送中…",
      form_success: "已收到，我们会尽快回复你。",
      form_error: "发送失败，请稍后重试，或直接邮件联系 info@lenshead.top。",
      ft_tagline: "镜头之下，光影之间",
      ft_rights: "© 2026 Lenshead Studio. 保留所有权利。",
      ft_designed: "东京设计 · 手工编写",
      ft_top: "回到顶部"
    },
    ja: {
      a11y_skip: "本文へスキップ",
      loader_hint: "現像中",
      nav_work: "作品", nav_studio: "スタジオ", nav_founder: "主宰",
      nav_services: "サービス", nav_contact: "お問い合わせ", nav_cta: "相談する",
      hero_cjk: "光を、撮る。",
      hero_sub: "東京のフォトスタジオ。私たちが撮るのは被写体ではなく、被写体に落ちる光です。",
      hero_scroll: "スクロール",
      mf_label: "マニフェスト",
      mf_text: "光は照らすだけでなく、\n被写体を定義する。",
      mf_note: "東京 · 2018 年より",
      wk_label: "厳選作品",
      wk_cat1: "静物・商業", wk_cat2: "ファッション・エディトリアル", wk_cat3: "ポートレート・自然光",
      wk_cat4: "ライブ・ステージ", wk_cat5: "空間・建築", wk_cat6: "静物・スタイリング",
      wk_end: "続きはアーカイブに。", wk_end_cta: "フルポートフォリオを請求",
      ix_label: "アーカイブ索引", ix_col1: "No. / 作品", ix_col2: "種別", ix_col3: "年",
      st_label: "スタジオ",
      st_title: "光のために存在する<br>東京のスタジオ",
      st_p1: "Lenshead は 2018 年に設立しました。コンセプト、撮影、レタッチまで、ブランドと個人のための映像制作を一貫して手がけています。商品カット一枚から、ブランドの視覚言語そのものまで。",
      st_p2: "チームはフォトグラファー、照明、レタッチャーで構成されています。私たちが目指すのは「きれい」ではなく「正確」— 正確な光、正確な質感、正確な沈黙。",
      st_s1: "年の実績", st_s2: "制作実績", st_s3: "提携ブランド", st_s4: "東京・常駐チーム",
      fd_label: "主宰",
      fd_caption: "初めてマイクを握った日。二十年後、同じ物語をレンズで語ることになるとは、まだ知らなかった。",
      fd_role: "創設者・チーフフォトグラファー / ビジュアルディレクター",
      fd_quote: "「映像は記録ではなく、器である。」",
      fd_bio: "楊伯虎（Young）は Lenshead Studio の創設者です。映像は感情と物語の器だと信じ、映画的な言語で人物の真実の瞬間を捉えることを得意としています。スタジオを「レンズの先端」と名付けたのも、すべては光がレンズに入るその瞬間から始まるからです。",
      fd_c1: "米国テンプル大学クライン・メディア・コミュニケーション学部を卒業、映像叙事と演出を専攻。",
      fd_c2: "若くして映画制作に身を投じ、複数の劇場公開・インディペンデント映画の撮影・制作に関わる。",
      fd_c3: "関与した映画『Burning Sea』がカンヌ映画祭の関連部門に入選。",
      fd_c4: "帰国後は商業・ポートレート撮影に深耕し、フォロワー100万人超のトップクリエイター多数の撮影を手がける。",
      sv_label: "サービス",
      s1_title: "商業写真", s1_desc: "ブランド映像・商品広告・企業パンフレットの撮影で、ブランドの視覚を昇華します。",
      s2_title: "ポートレート", s2_desc: "個人写真・プロフィール・タレント宣材で、本物のあなたを表現します。",
      s3_title: "ファッション", s3_desc: "服装カタログ・エディトリアル・ルックブックで、潮流の基準を描きます。",
      s4_title: "イベント", s4_desc: "発表会・年次総会・展示会の現場を、瞬間ごとに記録します。",
      s5_title: "空間写真", s5_desc: "建築外観・インテリア・ホテルの撮影で、空間デザインの美を提示します。",
      s6_title: "ポストプロダクション", s6_desc: "本格的なカラーグレーディング・修整・合成で、出版品質を実現します。",
      ct_label: "お問い合わせ",
      ct_desc: "商業案件、雑誌の撮影、個人制作 —— 何を撮りたいのか、聞かせてください。",
      ct_avail: "2027 Q1 受付中",
      ct_email_label: "メール", ct_studio_label: "スタジオ", ct_studio_val: "日本・東京",
      ct_hours_label: "営業時間", ct_hours_val: "月〜金 10:00–19:00 (JST)",
      ct_social_label: "ソーシャル",
      form_name: "お名前", form_email: "メール", form_subject: "件名",
      form_message: "メッセージ", form_submit: "送信", form_note: "送信後、メールにて速やかにご連絡します。",
      form_required: "お名前・メール・メッセージをご入力ください。",
      form_email_invalid: "有効なメールアドレスを入力してください（例：you@example.com）。",
      form_sending: "送信中…",
      form_success: "受け付けました。追ってご返信いたします。",
      form_error: "送信に失敗しました。しばらくしてから再度お試しいただくか、info@lenshead.top へ直接メールしてください。",
      ft_tagline: "レンズの下、光と影の間で",
      ft_rights: "© 2026 Lenshead Studio. 全著作権所有。",
      ft_designed: "東京設計・手書きコード",
      ft_top: "トップへ"
    },
    en: {
      a11y_skip: "Skip to content",
      loader_hint: "developing",
      nav_work: "Work", nav_studio: "Studio", nav_founder: "Founder",
      nav_services: "Services", nav_contact: "Contact", nav_cta: "Let's talk",
      hero_cjk: "We photograph light.",
      hero_sub: "A Tokyo photography studio. We don't photograph subjects — we photograph the light that falls on them.",
      hero_scroll: "Scroll",
      mf_label: "Manifesto",
      mf_text: "Light doesn't\nreveal a subject.\nIt defines it.",
      mf_note: "Tokyo · since 2018",
      wk_label: "Selected works",
      wk_cat1: "Still life · Commercial", wk_cat2: "Fashion · Editorial", wk_cat3: "Portrait · Available light",
      wk_cat4: "Live · Stage", wk_cat5: "Space · Architecture", wk_cat6: "Still life · Styling",
      wk_end: "There's more in the archive.", wk_end_cta: "Request full portfolio",
      ix_label: "Archive index", ix_col1: "No. / Work", ix_col2: "Type", ix_col3: "Year",
      st_label: "Studio",
      st_title: "A Tokyo studio<br>that exists for light",
      st_p1: "Lenshead was founded in 2018. We take brands and individuals from concept through shoot to final grade — from a single product frame to an entire visual language.",
      st_p2: "The team is photographers, lighting designers and retouchers. We're not chasing “pretty”. We're chasing accurate: accurate light, accurate texture, accurate silence.",
      st_s1: "Years", st_s2: "Projects", st_s3: "Brands", st_s4: "Tokyo · in-house",
      fd_label: "Founder",
      fd_caption: "The first time he held a microphone. He didn't know yet that twenty years later he'd tell the same story through a lens.",
      fd_role: "Founder · Chief Photographer / Visual Director",
      fd_quote: "“An image isn't a record. It's a vessel.”",
      fd_bio: "Yang Bohu (Young) is the founder of Lenshead Studio. He believes an image is a vessel for emotion and story, and works in a cinematic language to catch the most honest moment of his subjects. It's why he named the studio after the head of the lens — everything begins the instant light enters it.",
      fd_c1: "Graduate of the Klein College of Media and Communication at Temple University, majoring in visual storytelling and directing.",
      fd_c2: "Began in film production, contributing to the shooting and making of multiple theatrical and independent films.",
      fd_c3: "The film he worked on, 'Burning Sea', was selected for a Cannes-affiliated showcase.",
      fd_c4: "Since returning to China he has focused on commercial and portrait work, shooting for several million-follower creators.",
      sv_label: "Services",
      s1_title: "Commercial", s1_desc: "Brand films, product advertising and corporate shoots that elevate your visual identity.",
      s2_title: "Portrait", s2_desc: "Personal, professional and talent portraits that reveal your most authentic self.",
      s3_title: "Fashion", s3_desc: "Apparel catalogs, editorial and lookbooks that set the standard for trend visuals.",
      s4_title: "Event", s4_desc: "Launches, annual meetings and exhibitions captured in every brilliant moment.",
      s5_title: "Architecture", s5_desc: "Exteriors, interiors and hospitality spaces that reveal the beauty of design.",
      s6_title: "Post-production", s6_desc: "Grading, retouching and compositing that bring every image to publish-ready quality.",
      ct_label: "Contact",
      ct_desc: "Commercial work, editorial commissions, personal projects — tell us what you want to shoot.",
      ct_avail: "Booking Q1 2027",
      ct_email_label: "Email", ct_studio_label: "Studio", ct_studio_val: "Tokyo, Japan",
      ct_hours_label: "Hours", ct_hours_val: "Mon–Fri 10:00–19:00 (JST)",
      ct_social_label: "Social",
      form_name: "Name", form_email: "Email", form_subject: "Subject",
      form_message: "Message", form_submit: "Send", form_note: "We'll get back to you by email shortly.",
      form_required: "Please fill in name, email and message.",
      form_email_invalid: "Please enter a valid email address (e.g. you@example.com).",
      form_sending: "Sending…",
      form_success: "Received — we'll reply shortly.",
      form_error: "Sending failed. Please retry, or email info@lenshead.top directly.",
      ft_tagline: "Beneath the lens, between light and shadow",
      ft_rights: "© 2026 Lenshead Studio. All rights reserved.",
      ft_designed: "Designed in Tokyo · hand-coded",
      ft_top: "Back to top"
    }
  };

  var TITLES = {
    zh: "Lenshead Studio｜镜头之下，光影之间",
    ja: "Lenshead Studio｜レンズの下、光と影の間で",
    en: "Lenshead Studio — We Shoot Light"
  };
  var DESCS = {
    zh: "Lenshead Studio — 东京摄影工作室。我们不拍摄主体，我们拍摄落在主体上的光。商业 / 人像 / 时尚 / 纪实。Since 2018.",
    ja: "Lenshead Studio — 東京のフォトスタジオ。被写体ではなく、被写体に落ちる光を撮る。商業・ポートレート・ファッション・ドキュメンタリー。2018年設立。",
    en: "Lenshead Studio — a Tokyo photography studio. We don't photograph subjects, we photograph the light that falls on them. Commercial, portrait, fashion, documentary. Since 2018."
  };

  var lang = "zh";
  try { var saved = localStorage.getItem("lenshead_lang"); if (saved && I18N[saved]) lang = saved; } catch (e) {}
  function t(k) { return (I18N[lang] && I18N[lang][k]) || k; }

  var mfSpans = [];
  var mfOffsets = [];

  function splitManifesto() {
    var el = $("#mfText");
    if (!el) return;
    var raw = t(el.getAttribute("data-split"));
    el.textContent = "";
    var isCJK = /[\u3040-\u30ff\u3400-\u9fff]/.test(raw);
    var parts = isCJK ? raw.split("") : raw.split(/(\s+)/);
    mfSpans = [];
    parts.forEach(function (p) {
      if (!p) return;
      if (/^\s+$/.test(p)) {
        /* an explicit \n in the copy buys a real line break, so each line of
           the manifesto can be a complete thought */
        if (p.indexOf("\n") > -1) el.appendChild(document.createElement("br"));
        else el.appendChild(document.createTextNode(" "));
        return;
      }
      var s = document.createElement("span");
      s.textContent = p;
      el.appendChild(s);
      mfSpans.push(s);
    });
    measureManifesto();
  }

  function measureManifesto() {
    mfOffsets = mfSpans.map(function (s) { return s.offsetTop + s.offsetHeight * 0.55; });
  }

  var mfLit = -1;
  function updateManifesto() {
    var el = $("#mfText");
    if (!el || !mfSpans.length) return;
    var r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
    var line = window.innerHeight * 0.62 - r.top;
    var n = 0;
    for (var i = 0; i < mfOffsets.length; i++) { if (mfOffsets[i] < line) n = i + 1; else break; }
    if (n === mfLit) return;
    mfLit = n;
    for (var j = 0; j < mfSpans.length; j++) {
      mfSpans[j].classList.toggle("is-lit", j < n);
    }
  }

  function setLang(next) {
    if (!I18N[next]) next = "zh";
    lang = next;
    html.lang = next;
    $$("[data-i18n]").forEach(function (el) {
      var v = I18N[next][el.getAttribute("data-i18n")];
      if (v == null) return;
      if (v.indexOf("<br") > -1) el.innerHTML = v; else el.textContent = v;
    });
    document.title = TITLES[next];
    var md = $('meta[name="description"]');
    if (md) md.setAttribute("content", DESCS[next]);
    $$(".lang__btn").forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.lang === next);
      b.setAttribute("aria-pressed", b.dataset.lang === next ? "true" : "false");
    });
    try { localStorage.setItem("lenshead_lang", next); } catch (e) {}
    mfLit = -1;
    splitManifesto();
    layout();
  }

  $$(".lang__btn").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });

  /* ======================================================================
     2. preloader — the aperture
     ====================================================================== */
  var loader    = $("#loader");
  var loaderPct = $("#loaderPct");
  var loaderF   = $("#loaderF");
  var irisHex   = $("#irisHex");
  var irisBlade = $("#irisBlades");
  var irisBar   = $("#irisBar");
  var STOPS = ["1.4", "2", "2.8", "4", "5.6", "8", "11", "16", "22"];
  /* the loader opens the aperture: f/22 -> f/1.4, light let in */
  var OPEN_STOPS = STOPS.slice().reverse();
  var CIRC = 2 * Math.PI * 86;

  function drawIris(r, rot) {
    if (!irisHex) return;
    var pts = [], blades = "";
    for (var i = 0; i < 6; i++) {
      var a = (Math.PI / 3) * i + rot - Math.PI / 2;
      pts.push([100 + r * Math.cos(a), 100 + r * Math.sin(a)]);
    }
    irisHex.setAttribute("points", pts.map(function (p) { return p[0].toFixed(2) + "," + p[1].toFixed(2); }).join(" "));
    pts.forEach(function (p, i) {
      var a = (Math.PI / 3) * i + rot - Math.PI / 2 + 0.98;
      var ir = r * 0.32;
      blades += '<line x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) +
                '" x2="' + (100 + ir * Math.cos(a)).toFixed(1) +
                '" y2="' + (100 + ir * Math.sin(a)).toFixed(1) + '"/>';
    });
    irisBlade.innerHTML = blades;
  }

  function paintLoader(p) {
    if (loaderPct) loaderPct.textContent = String(Math.round(p * 100)).padStart(3, "0");
    if (loaderF) loaderF.textContent = "f/" + OPEN_STOPS[Math.min(OPEN_STOPS.length - 1, Math.floor(p * OPEN_STOPS.length))];
    if (irisBar) irisBar.style.strokeDashoffset = String(CIRC * (1 - p));
    drawIris(lerp(15, 62, p), lerp(0.34, 0, p));
  }

  function finishLoad() {
    paintLoader(1);
    setTimeout(function () {
      if (loader) loader.classList.add("is-done");
      html.classList.add("is-ready");
      setTimeout(function () { if (loader) loader.style.display = "none"; layout(); }, 1200);
    }, 180);
  }

  function runLoader() {
    if (!loader || REDUCED) {
      if (loader) loader.style.display = "none";
      html.classList.add("is-ready");
      return;
    }
    var t0 = performance.now(), D1 = 760, D2 = 260;
    var heroImg = $(".hero__media img");
    var decoded = false;
    var go = function () { decoded = true; };

    if (heroImg) {
      if (heroImg.decode) heroImg.decode().then(go, go);
      else if (heroImg.complete) go();
      else heroImg.addEventListener("load", go, { once: true });
    } else { decoded = true; }
    setTimeout(go, 2400);

    (function step(now) {
      var e = clamp((now - t0) / D1, 0, 1);
      var eased = 1 - Math.pow(1 - e, 3);
      paintLoader(eased * 0.9);
      if (e < 1) { requestAnimationFrame(step); return; }
      var hold = function () {
        var t1 = performance.now();
        (function step2(n2) {
          var e2 = clamp((n2 - t1) / D2, 0, 1);
          paintLoader(lerp(0.9, 1, 1 - Math.pow(1 - e2, 3)));
          if (e2 < 1) { requestAnimationFrame(step2); } else { finishLoad(); }
        })(performance.now());
      };
      if (decoded) hold(); else setTimeout(hold, 400);
    })(performance.now());
  }

  /* ======================================================================
     3. custom cursor
     ====================================================================== */
  var cur = $("#cur");
  var curFrame = cur && cur.querySelector(".cur__frame");
  var curDot = cur && cur.querySelector(".cur__dot");
  var curLabel = cur && cur.querySelector(".cur__label");
  var mx = -100, my = -100, rx = -100, ry = -100, curOn = false;

  if (cur && FINE && !REDUCED) {
    html.classList.add("has-cursor");
    html.setAttribute("data-tone", "dark");
    curOn = true;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      /* the dot is dead-on the pointer so aiming stays exact; the brackets
         trail a frame behind, which is what makes it feel like AF hunting */
      if (curDot) curDot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
    }, { passive: true });

    document.addEventListener("mouseover", function (e) {
      var el = e.target.closest("[data-cursor], a, button, .wk");
      var mode = "", label = "";
      if (el) {
        mode = el.getAttribute("data-cursor") || "";
        if (el.tagName === "A" || el.tagName === "BUTTON") mode = mode || "link";
        if (el.classList.contains("wk")) { mode = "media"; label = "view"; }
        if (mode === "scroll") { mode = "link"; label = ""; }
      }
      html.setAttribute("data-cur", mode);
      if (curLabel) curLabel.textContent = label;
    });
  }

  /* ======================================================================
     4. layout + the single rAF loop
     ====================================================================== */
  var works     = $(".works");
  var worksViewport = $(".works__viewport");
  var pin       = $(".works__pin");
  var track     = $("#wkTrack");
  var wkProg    = $("#wkProg");
  var wkNow     = $("#wkNow");
  var heroMedia = $("#heroMedia");
  var heroBody  = $(".hero__body");
  var heroEl    = $(".hero");
  var nav       = $("#nav");
  var railMark  = $("#railMark");
  var railF     = $("#railF");
  var railScale = $(".rail__scale");
  var panels = [], worksDist = 0, pinned = false, panelMeta = [];
  var wkIndex = 1;

  function isPinned() { return window.innerWidth > 900 && !REDUCED; }

  function layout() {
    pinned = isPinned();
    if (!track) return;
    if (!pinned) {
      if (works) works.style.height = "";
      track.style.transform = "";
      worksDist = 0;
      return;
    }
    var w = track.scrollWidth;
    worksDist = Math.max(0, w - window.innerWidth);
    if (works) works.style.height = (window.innerHeight + worksDist) + "px";

    panels = $$(".wk", track);
    panelMeta = panels.map(function (p) {
      return { el: p, off: p.offsetLeft, w: p.offsetWidth };
    });
    observePanels();
    onScroll();
  }

  function goWork(i) {
    if (!pinned || !works || !worksDist) return;
    var m = panelMeta[i];
    if (!m) return;
    var p = clamp((m.off + m.w / 2 - window.innerWidth / 2) / worksDist, 0, 1);
    var top = works.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + p * worksDist, behavior: "smooth" });
  }

  var wkPrev = $("#wkPrev"), wkNext = $("#wkNext");
  if (wkPrev) wkPrev.addEventListener("click", function () { goWork(Math.max(0, wkIndex - 2)); });
  if (wkNext) wkNext.addEventListener("click", function () { goWork(Math.min(5, wkIndex)); });

  var lastY = 0, ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var vh = window.innerHeight;

    /* nav */
    if (nav) {
      if (y > 40) nav.classList.add("is-solid"); else nav.classList.remove("is-solid");
      if (y > vh * 0.9 && y > lastY + 4) nav.classList.add("is-hidden");
      else if (y < lastY - 4 || y < vh * 0.5) nav.classList.remove("is-hidden");
    }
    lastY = y;

    /* exposure rail */
    var max = document.documentElement.scrollHeight - vh;
    var p = max > 0 ? clamp(y / max, 0, 1) : 0;
    if (railMark && railScale) railMark.style.top = (p * (railScale.offsetHeight - 1)) + "px";
    if (railF) railF.textContent = "f/" + STOPS[Math.min(STOPS.length - 1, Math.floor(p * STOPS.length))];

    /* hero parallax + fade */
    if (heroMedia && y < vh * 1.4) {
      heroMedia.style.transform = "translate3d(0," + (y * 0.16).toFixed(2) + "px,0)";
      if (heroBody) heroBody.style.opacity = String(clamp(1 - y / (vh * 0.75), 0, 1));
    }
    /* pause the hero breathing animations once it is off-screen */
    if (heroEl) heroEl.classList.toggle("is-asleep", y > vh * 1.2);

    /* manifesto lighting */
    updateManifesto();
    updateNav();
    updateTone();

    /* pinned works */
    if (pinned && works && worksDist > 0 && track) {
      var top = -(works.getBoundingClientRect().top);
      var wp = clamp(top / worksDist, 0, 1);
      track.style.transform = "translate3d(" + (-wp * worksDist).toFixed(2) + "px,0,0)";
      if (wkProg) wkProg.style.transform = "scaleX(" + wp + ")";

      var mid = window.innerWidth / 2, best = 0, bestD = Infinity;
      for (var i = 0; i < panelMeta.length; i++) {
        var c = panelMeta[i].off + panelMeta[i].w / 2 - wp * worksDist;
        var d = Math.abs(c - mid);
        if (d < bestD) { bestD = d; best = i; }
      }
      var n = clamp(best + 1, 1, 6);
      if (n !== wkIndex) {
        wkIndex = n;
        if (wkNow) wkNow.textContent = String(n).padStart(2, "0");
      }
    } else if (worksViewport) {
      /* unpinned (mobile): mirror the native scroller into the same progress bar */
      var sv = worksViewport.scrollLeft;
      var smax = worksViewport.scrollWidth - worksViewport.clientWidth;
      var mp = smax > 0 ? clamp(sv / smax, 0, 1) : 0;
      if (wkProg) wkProg.style.transform = "scaleX(" + mp + ")";
    }
  }

  function loop() {
    onScroll();
    if (curOn && curFrame) {
      rx = lerp(rx, mx, 0.19);
      ry = lerp(ry, my, 0.19);
      curFrame.style.transform = "translate3d(" + rx.toFixed(2) + "px," + ry.toFixed(2) + "px,0)";
    }
    requestAnimationFrame(loop);
  }

  /* ======================================================================
     4b. work panels — clip reveal + nav active state
     ====================================================================== */
  var wkObserver = null;
  if ("IntersectionObserver" in window) {
    wkObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle("is-in", en.isIntersecting);
      });
    }, { threshold: 0.12 });
  }

  function observePanels() {
    if (!track) return;
    $$(".wk", track).forEach(function (w, i) {
      if (wkObserver) {
        if (wkObserver.observe) wkObserver.observe(w);
      } else {
        w.classList.add("is-in");
      }
      var m = w.querySelector(".media");
      if (m) m.style.transitionDelay = (i % 2) * 60 + "ms";
    });
  }

  var navSections = ["work", "studio", "founder", "services"].map(function (id) {
    return {
      id: id,
      el: document.getElementById(id),
      link: $('.nav__link[href="#' + id + '"]')
    };
  }).filter(function (o) { return o.el && o.link; });

  var activeNav = "";

  /* the two paper sections — the reticle flips to ink over them, and so does
     the nav bar. They are judged at different heights: the reticle follows the
     viewport centre, the bar follows its own position at the top edge. */
  var lightSecs = $$(".mf, .fd");
  var curTone = "", navTone = "";

  function updateTone() {
    if (!lightSecs.length) return;
    var lightAt = function (y) {
      for (var i = 0; i < lightSecs.length; i++) {
        var r = lightSecs[i].getBoundingClientRect();
        if (r.top <= y && r.bottom > y) return true;
      }
      return false;
    };
    var t = lightAt(window.innerHeight * 0.5) ? "light" : "dark";
    if (t !== curTone) { curTone = t; html.setAttribute("data-tone", t); }
    var n = lightAt(40) ? "light" : "dark";
    if (n !== navTone) { navTone = n; html.setAttribute("data-navtone", n); }
  }

  function updateNav() {
    if (!navSections.length) return;
    var mid = window.innerHeight * 0.42;
    var found = "";
    for (var i = 0; i < navSections.length; i++) {
      var r = navSections[i].el.getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) found = navSections[i].id;
    }
    if (found === activeNav) return;
    activeNav = found;
    navSections.forEach(function (s) {
      s.link.classList.toggle("is-active", s.id === found);
    });
  }

  /* ======================================================================
     5. counters
     ====================================================================== */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (REDUCED) { el.textContent = String(target); return; }
    var t0 = performance.now(), D = 1500;
    (function step(now) {
      var e = clamp((now - t0) / D, 0, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - e, 3))));
      if (e < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ======================================================================
     6. index → cursor-following preview
     ====================================================================== */
  var pv = $("#pv"), pvImg = $("#pvImg"), pvNo = $("#pvNo");
  var PV_SRC = {
    "portfolio-1": "images/opt/portfolio-1-768.webp",
    "portfolio-2": "images/opt/portfolio-2-900.webp",
    "portfolio-3": "images/opt/portfolio-3-900.webp",
    "portfolio-4": "images/opt/portfolio-4-768.webp",
    "portfolio-5": "images/opt/portfolio-5-768.webp",
    "portfolio-6": "images/opt/portfolio-6-768.webp"
  };
  var pvX = -300, pvY = -300, pvTX = -300, pvTY = -300, pvOn = false;

  if (pv && pvImg && FINE && !REDUCED) {
    $$(".ix__row").forEach(function (row) {
      row.addEventListener("mouseenter", function () {
        var key = row.getAttribute("data-preview");
        pvImg.src = PV_SRC[key] || "";
        if (pvNo) pvNo.textContent = (row.querySelector("em") || {}).textContent || "";
        pv.classList.add("is-on");
        pvOn = true;
      });
      row.addEventListener("mouseleave", function () {
        pv.classList.remove("is-on");
        pvOn = false;
      });
      row.addEventListener("click", function (e) {
        var idx = parseInt(row.getAttribute("data-work"), 10);
        if (pinned) { e.preventDefault(); goWork(idx); }
      });
    });
    window.addEventListener("mousemove", function (e) {
      pvTX = e.clientX + 28; pvTY = e.clientY - 40;
    }, { passive: true });

    (function pvLoop() {
      pvX = lerp(pvX, pvTX, 0.14);
      pvY = lerp(pvY, pvTY, 0.14);
      var w = pv.offsetWidth || 220, h = pv.offsetHeight || 300;
      var cx = clamp(pvX, 14, Math.max(14, window.innerWidth - w - 14));
      var cy = clamp(pvY, 14, Math.max(14, window.innerHeight - h - 14));
      pv.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
      requestAnimationFrame(pvLoop);
    })();
  }

  /* ======================================================================
     7. magnetic buttons
     ====================================================================== */
  if (FINE && !REDUCED) {
    $$("[data-magnet]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        el.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ======================================================================
     8. mobile menu
     ====================================================================== */
  var toggle = $("#navToggle"), menu = $("#menu");
  function setMenu(open) {
    if (!menu || !toggle) return;
    if (open) menu.removeAttribute("hidden");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    menu.classList.toggle("is-open", open);
    body.classList.toggle("is-locked", open);
    if (!open) setTimeout(function () { if (!menu.classList.contains("is-open")) menu.setAttribute("hidden", ""); }, 820);
  }
  if (toggle) toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  if (menu) $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle && toggle.getAttribute("aria-expanded") === "true") setMenu(false);
  });

  /* ======================================================================
     9. Tokyo clock
     ====================================================================== */
  var clocks = [$("#clock"), $("#clock2")];
  function tickClock() {
    var s;
    try {
      s = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
      }).format(new Date());
    } catch (e) {
      var d = new Date();
      s = [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (n) { return String(n).padStart(2, "0"); }).join(":");
    }
    clocks.forEach(function (c) { if (c) c.textContent = s; });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ======================================================================
     10. contact form
     ====================================================================== */
  var FORMSPREE = "https://formspree.io/f/xyegdnrw";
  var INQUIRY_TO = "info@lenshead.top";

  function sendInquiry(payload) {
    if (FORMSPREE) {
      return fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          subject: payload.subject || "Lenshead enquiry",
          message: payload.message,
          _subject: "Lenshead enquiry · " + payload.name + (payload.subject ? " (" + payload.subject + ")" : "")
        })
      }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); });
    }
    var subj = encodeURIComponent(payload.subject || "Lenshead enquiry");
    var b = encodeURIComponent("Name: " + payload.name + "\nEmail: " + payload.email + "\n\n" + payload.message);
    window.location.href = "mailto:" + INQUIRY_TO + "?subject=" + subj + "&body=" + b;
    return Promise.resolve();
  }

  (function () {
    var form = $("#contactForm");
    if (!form) return;
    var statusEl = $("#cf-status");
    var btn = form.querySelector("button[type=submit]");

    function say(msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = "ct__status" + (kind ? " ct__status--" + kind : "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.elements.company && form.elements.company.value.trim()) return;

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var subject = form.elements.subject.value.trim();
      var message = form.elements.message.value.trim();

      if (!name || !email || !message) {
        say(t("form_required"), "err");
        (!name ? form.elements.name : !email ? form.elements.email : form.elements.message).focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        say(t("form_email_invalid"), "err");
        form.elements.email.focus();
        return;
      }

      say(t("form_sending"), "pending");
      if (btn) btn.disabled = true;
      sendInquiry({ name: name, email: email, subject: subject, message: message })
        .then(function () { say(t("form_success"), "ok"); form.reset(); })
        .catch(function () { say(t("form_error"), "err"); })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  })();

  /* ======================================================================
     11. boot
     ====================================================================== */
  setLang(lang);
  runLoader();
  layout();
  requestAnimationFrame(loop);

  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () { layout(); measureManifesto(); }, 140);
  });
  window.addEventListener("load", function () { layout(); measureManifesto(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { measureManifesto(); layout(); });
  }
})();
