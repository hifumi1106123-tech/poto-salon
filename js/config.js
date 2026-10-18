/*
 * Relaxation POTO — サイト設定ファイル
 * ------------------------------------------------------------
 * 写真・文章・メニュー・料金・施術者・アクセス・予約先は、このファイルだけで編集できます。
 *
 * 基本ルール
 *  - 日英は { ja: "日本語", en: "English" } の形で書きます。
 *  - 文中の改行は \n、段落の区切りは配列（[ "段落1", "段落2" ]）で書きます。
 *  - 空文字 "" の項目はサイトに表示されません（未確定の情報は空欄のままでOK）。
 *  - 編集後はブラウザを再読み込みしてください。
 */
window.SITE_CONFIG = {
  salonName: "Relaxation POTO",

  // 公開前に false にすると、仮画像枠の「差し替え用ラベル」が消えます
  showPlaceholderLabels: false,

  // ===== 写真 =====
  // src が空のときは仮画像枠を表示します。推奨サイズは README.md を参照。
  /*
   * ★ images/salon/ は実際の店舗写真、images/stock/ は仮のストック写真（Unsplash・無料ライセンス）です。
   *   川平湾やPOTOの実際の写真ではないため、公開前に必ず本番の写真へ差し替えてください。
   *   差し替えたら alt（写真の説明）も実際の内容に合わせて書き換えます。
   *   例: src: "images/hero-kabira.jpg", alt: { ja: "石垣島・川平湾の海", en: "The sea at Kabira Bay, Ishigaki Island" }
   *   position（任意）: 写真の見せたい位置。例 "50% 80%" で下寄り（横 縦）
   */
  images: {
    logo: { src: "images/logo.png", alt: "POTO relaxation" },
    hero: {
      src: "images/stock/hero-sea.jpg",
      alt: { ja: "透明感のある青い海", en: "Clear turquoise sea" },
      // 写真の上にかける薄い暗幕の濃さ（0〜1）。写真が明るい場合は 0.3 前後に
      overlay: 0.28,
      placeholder: "MAIN PHOTO｜川平湾の海（横長）",
    },
    gallery: [
      { src: "images/salon/gallery-hands-back.jpg", alt: { ja: "タオル越しに背中をほぐす施術の手元", en: "Hands easing the back through a towel" }, placeholder: "PHOTO 1｜マッサージの手元" }, // 実際の店舗写真
      { src: "images/stock/gallery-2-oil.jpg", alt: { ja: "オイルを使った施術でくつろぐ様子", en: "Relaxing during an oil treatment" }, position: "62% 50%", placeholder: "PHOTO 2｜施術中のくつろぎ" },
      { src: "images/salon/gallery-therapist-head.jpg", alt: { ja: "セラピストがタオルの上から頭をやさしく包む施術", en: "Our therapist gently holding a guest's head through a towel" }, placeholder: "PHOTO 3｜施術者の雰囲気" }, // 実際の店舗写真
      { src: "images/stock/gallery-4-room.jpg", alt: { ja: "自然光が入る白い室内", en: "A white room in natural light" }, placeholder: "PHOTO 4｜自然光の店内" },
      { src: "images/stock/gallery-5-oil-bottle.jpg", alt: { ja: "オイルのボトルとユーカリ", en: "A bottle of oil with eucalyptus" }, placeholder: "PHOTO 5｜タオル・オイル" },
    ],
  },

  // ===== ヘッダーのナビゲーション =====
  // modal: 開くモーダルの名前（about / therapist / menu / access）
  nav: [
    { label: "ABOUT", sub: "サロンの想い", modal: "about", title: { ja: "サロンの想い", en: "Our Story" } },
    { label: "THERAPIST", sub: "施術者紹介", modal: "therapist", title: { ja: "施術者紹介", en: "Your Therapist" } },
    { label: "MENU & PRICES", sub: "メニュー・料金", modal: "menu", title: { ja: "メニュー・料金", en: "Menu & Prices" } },
    { label: "ACCESS", sub: "アクセス", modal: "access", title: { ja: "アクセス", en: "Access" } },
  ],
  bookNow: { label: "BOOK NOW", sub: "ご予約" },

  // ===== メイン写真のコピー =====
  hero: {
    // 日本語は縦書き2列（1行目が右の列になります）
    copy: {
      ja: ["いつも誰かを想うあなたに、", "今日だけは、自分をいたわる時間を。"],
      en: ["For you, who always thinks of others —", "today, take a moment to care for yourself."],
    },
    tagline: {
      ja: "石垣島・川平｜女性専用リラクゼーションサロン",
      en: "Kabira, Ishigaki Island | A relaxation salon for women",
    },
  },

  // ===== 紹介文（メイン写真の下） =====
  intro: {
    ja: [
      "家族の予定、仕事の予定。\n自分が休む時間は、つい後回しに。",
      "POTOは、そんな毎日の中で\nほっと力を抜ける、女性のためのサロンです。",
      "手のぬくもりで身体をゆるめ、\nおうちで続けられるケアも、一緒に。",
      "ここで過ごす時間が、\n自分をいたわる日々につながるように。",
      "石垣島・川平で、あなただけのひと息を。\n明日も、あなたらしい笑顔で。",
    ],
    en: [
      "Family plans, work plans.\nYour own rest so often comes last.",
      "POTO is a salon for women —\na place to let go and breathe out amid busy days.",
      "We ease your body with warm hands,\nand share simple care you can continue at home.",
      "May your time here lead to\neveryday moments of caring for yourself.",
      "A breath just for you, in Kabira, Ishigaki Island.\nSo you can smile as yourself again tomorrow.",
    ],
  },

  // ===== ABOUT（モーダル） =====
  about: {
    title: { ja: "毎日の中に、\n自分をいたわる時間を。", en: "Making time to care for yourself, every day." },
    body: {
      ja: [
        "「疲れを取りたい」「明日も笑顔で頑張りたい」。POTOは、そう願う女性が、自分のケアを日常の中で無理なく続けられるサロンを目指しています。",
        "施術で身体をゆるめるだけでなく、同じ疲れや不調をくり返しにくい身体づくりを目指して、その日から取り入れられる身体の使い方や、おうちで続けられるケアもお伝えしています。",
        "ここでの時間をきっかけに、自分の身体に気づき、自分で自分をいたわれるように。家族との時間や好きなことを、もっと笑顔で楽しめる毎日につながればと願っています。",
        "気軽に通える、身近なサロンとして。そして、川平の静かな時間の中で、自分だけに向き合えるひとときとして。",
      ],
      en: [
        "POTO is a salon for women who want to ease their tiredness and keep smiling through tomorrow — a place where caring for yourself can become a natural part of everyday life.",
        "Beyond the treatment itself, we aim to help you build a body less prone to the same tiredness and tension, sharing simple ways to move and self-care you can start at home the very same day.",
        "We hope your time here helps you notice what your body needs and learn to care for yourself, so you can enjoy time with family and the things you love with an easier smile.",
        "A familiar place you can visit often — and a quiet moment just for you, in Kabira.",
      ],
    },
  },

  // ===== THERAPIST（モーダル） =====
  // name.ja が空の間は「準備中」の案内を表示します（架空の情報は入れないでください）
  therapist: {
    photo: "", // 例: "images/therapist.jpg"
    name: { ja: "", en: "" },
    profile: { ja: "", en: "" },
    message: { ja: "", en: "" },
    credentials: [
      // 例: { ja: "〇〇資格", en: "XX Certification" },
    ],
    comingSoon: {
      ja: "施術者のご紹介は、準備が整い次第こちらに掲載いたします。",
      en: "Our therapist's profile will be posted here soon.",
    },
  },

  // ===== MENU & PRICES（モーダル） =====
  menu: {
    // 料金が1つも入力されていない間だけ表示
    contactNote: {
      ja: "メニューや料金は、InstagramのDMからお気軽にお問い合わせください。",
      en: "For treatment details and prices, please send us an Instagram DM.",
    },
    // 島民料金が1つでも入力されると表示
    islanderNote: {
      ja: "島民料金は、石垣島・八重山にお住まいの方が対象です。",
      en: "Islander rates are for residents of Ishigaki and the Yaeyama Islands.",
    },
    currency: "¥",
    /*
     * minutes: 施術時間（分） / price: 料金 / islanderPrice: 島民料金（いずれも数字。空なら非表示）
     * 1つのメニューに複数のコースがある場合は options に行を追加します。
     * 記入例:
     *   options: [ { minutes: 60, price: 8000 }, { minutes: 90, price: 11000, islanderPrice: 10000 } ],
     */
    items: [
      { name: { ja: "ボディケア", en: "Body Care" }, description: { ja: "", en: "" }, options: [] },
      { name: { ja: "フットマッサージ", en: "Foot Massage" }, description: { ja: "", en: "" }, options: [] },
      { name: { ja: "ヘッドマッサージ", en: "Head Massage" }, description: { ja: "", en: "" }, options: [] },
      { name: { ja: "パーソナルピラティス", en: "Private Pilates" }, description: { ja: "", en: "" }, options: [] },
    ],
  },

  // ===== ACCESS（モーダル） =====
  access: {
    // value が空の行は表示されません
    rows: [
      { label: { ja: "エリア", en: "Area" }, value: { ja: "石垣島・川平\n川平湾から車で約1分", en: "Kabira, Ishigaki Island\nAbout 1 minute by car from Kabira Bay" } },
      { label: { ja: "ご利用", en: "Guests" }, value: { ja: "女性専用・完全予約制", en: "Women only, by appointment" } },
      { label: { ja: "住所", en: "Address" }, value: { ja: "", en: "" } },
      { label: { ja: "営業時間", en: "Hours" }, value: { ja: "", en: "" } },
      { label: { ja: "定休日", en: "Closed" }, value: { ja: "", en: "" } },
      { label: { ja: "駐車場", en: "Parking" }, value: { ja: "", en: "" } },
    ],
    mapUrl: "", // GoogleマップのURL。空ならボタンは表示されません
    mapLabel: { ja: "Googleマップで見る", en: "Open in Google Maps" },
  },

  // ===== 予約 =====
  booking: {
    title: { ja: "ご予約・お問い合わせ", en: "Booking & Inquiries" },
    body: {
      ja: "ご希望の日時とメニューを、InstagramのDMからお知らせください。\nメニューに迷われている方も、お気軽にご相談ください。",
      en: "To book, please send us an Instagram DM with your preferred date, time and treatment.\nNot sure which treatment to choose? Feel free to ask.",
    },
    // URLが空のボタンは表示されません
    instagram: "https://www.instagram.com/relaxation_poto/",
    whatsapp: "", // 例: "https://wa.me/819012345678"
    reserveSite: "", // 予約サイトのURL
    labels: {
      instagram: { ja: "InstagramのDMで予約する", en: "Book via Instagram DM" },
      whatsapp: { ja: "WhatsAppで予約する", en: "Book via WhatsApp" },
      reserveSite: { ja: "予約サイトで予約する", en: "Book online" },
    },
  },

  // ===== フッター =====
  footer: {
    tagline: { ja: "明日からの笑顔のために。", en: "Relax today. Smile tomorrow." },
  },

  // ===== 画面上の短い文言 =====
  ui: {
    close: { ja: "閉じる", en: "Close" },
    menu: { ja: "メニュー", en: "Menu" },
    swipe: { ja: "横にスワイプ", en: "Swipe" },
    gallery: { ja: "サロンの写真", en: "Salon photos" },
    newTab: { ja: "（新しいタブで開きます）", en: " (opens in a new tab)" },
    skip: { ja: "本文へスキップ", en: "Skip to content" },
    min: { ja: "分", en: " min" },
    islander: { ja: "島民料金", en: "Islander" },
    pageTitle: {
      ja: "Relaxation POTO｜石垣島・川平の女性専用リラクゼーションサロン",
      en: "Relaxation POTO | Women-only relaxation salon in Kabira, Ishigaki Island",
    },
  },
};
