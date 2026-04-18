$(function () {
  const STORAGE_KEY = "division_algorithm_history_json_v1";
  const LANGUAGE_KEY = "division_algorithm_language_v1";
  const SUPPORTED_LANGUAGES = ["en", "fil", "es", "fr", "zh", "ja", "ko", "ar", "hi", "pt", "de", "id", "vi"];
  const LANGUAGE_NAMES = {
    en: "English",
    fil: "Filipino",
    es: "Español",
    fr: "Français",
    zh: "中文",
    ja: "日本語",
    ko: "한국어",
    ar: "العربية",
    hi: "हिन्दी",
    pt: "Português",
    de: "Deutsch",
    id: "Bahasa Indonesia",
    vi: "Tiếng Việt"
  };
  const PROFILE_FIELD_LABELS = {
    en: { name: "Name", role: "Role" },
    fil: { name: "Pangalan", role: "Tungkulin" },
    es: { name: "Nombre", role: "Rol" },
    fr: { name: "Nom", role: "Rôle" },
    zh: { name: "姓名", role: "角色" },
    ja: { name: "名前", role: "役割" },
    ko: { name: "이름", role: "역할" },
    ar: { name: "الاسم", role: "الدور" },
    hi: { name: "नाम", role: "भूमिका" },
    pt: { name: "Nome", role: "Função" },
    de: { name: "Name", role: "Rolle" },
    id: { name: "Nama", role: "Peran" },
    vi: { name: "Tên", role: "Vai trò" }
  };
  const $feedback = $("#feedback");
  const $divisionForm = $("#divisionForm");
  const $dividend = $("#dividend");
  const $divisor = $("#divisor");
  const $computeBtn = $("#computeBtn");
  const $clearBtn = $("#clearBtn");
  const $getStartedBtn = $("#getStartedBtn");
  const $calculatorShortcutBtn = $("#calculatorShortcutBtn");
  const $viewTeamBtn = $("#viewTeamBtn");
  const $introSection = $("#introSection");
  const $teamSection = $("#teamSection");
  const $resultEmpty = $("#resultEmpty");
  const $resultContent = $("#resultContent");
  const $currentDividend = $("#currentDividend");
  const $currentDivisor = $("#currentDivisor");
  const $currentQuotient = $("#currentQuotient");
  const $currentRemainder = $("#currentRemainder");
  const $currentVerification = $("#currentVerification");
  const $formulaDisplay = $("#formulaDisplay");
  const $checkDisplay = $("#checkDisplay");
  const $explanationBody = $("#explanationBody");
  const $methodsList = $("#methodsList");
  const $stepsList = $("#stepsList");
  const $historyBody = $("#historyBody");
  const $historyCount = $("#historyCount");
  const $clearAllBtn = $("#clearAllBtn");
  const $languageSelect = $("#languageSelect");
  const editModalElement = document.getElementById("editModal");
  const editModal = new bootstrap.Modal(editModalElement);
  const $editForm = $("#editForm");
  const $editRecordId = $("#editRecordId");
  const $editDividend = $("#editDividend");
  const $editDivisor = $("#editDivisor");
  const $editAlert = $("#editAlert");

  const COPY = {
    en: {
      pageTitle: "Division Algorithm System",
      metaDescription: "A responsive Division Algorithm calculator with saved history, edit, update, and delete features.",
      heroKicker: "Interactive Math System",
      heroTitle: "Division Algorithm System",
      heroCopy: "Start here, then reveal the explanation of the Division Algorithm and explore the profiles before going deeper into the system.",
      getStarted: "Get Started",
      calculatorShortcutKicker: "Quick Access",
      calculatorShortcutTitle: "Open Calculator",
      calculatorShortcutAria: "Go to calculator",
      languageLabel: "Language",
      languageOptions: {
        en: "English",
        fil: "Filipino"
      },
      heroInsights: [
        {
          label: "Brief History",
          copy: "The Division Algorithm has long been used in number theory to describe how every integer can be expressed using a divisor, quotient, and remainder."
        },
        {
          label: "Description",
          copy: "This system turns that idea into an interactive calculator that shows the answer, the explanation, and the saved records in one place."
        },
        {
          label: "Quick Facts",
          copy: "The rule follows a = bq + r, the divisor must stay positive, and the remainder must satisfy 0 <= r < b."
        }
      ],
      coreAlgorithmLabel: "Core Algorithm",
      coreAlgorithmNote: "A learning tool built to make division visible, organized, and easy to review later.",
      intro: {
        tag: "Overview",
        title: "What is the Division Algorithm?",
        text: "The Division Algorithm explains how one number can be divided by another by producing a quotient and a remainder. It guarantees that the remainder is always smaller than the divisor, which makes the result complete and easy to verify.",
        points: [
          "It shows how the dividend is split into equal parts.",
          "It gives both the quotient and the remainder.",
          "It helps verify if the answer is correct."
        ],
        viewTeam: "View Profile Cards",
        coreIdeaLabel: "Core Idea",
        coreIdeaNote: "The remainder must always stay below the divisor."
      },
      team: {
        tag: "Profiles",
        title: "Professor and Developer Team",
        hint: "Click a card to slide the details",
        professorGroupTitle: "Professor",
        professorGroupNote: "The assigned professor who guided and requested the system.",
        studentGroupTitle: "Developer Team",
        studentGroupNote: "Antonio leads the developer team, while the remaining members support the system build and presentation.",
        professor: {
          label: "Professor",
          note: "Professor in charge of the system presentation",
          roleLabel: "Role",
          roleValue: "Professor",
          description: "The professor who assigned the project and will receive the final presentation and defense."
        },
        members: {
          antonio: {
            label: "Team Leader",
            note: "Click to view profile",
            roleLabel: "Role",
            roleValue: "Team Leader",
            description: "Leads the team in developing and presenting the Division Algorithm System."
          },
          ronald: {
            label: "Member",
            note: "Click to view profile",
            roleLabel: "Role",
            roleValue: "Member",
            description: "Part of the team responsible for building and presenting the system."
          },
          jaynielle: {
            label: "Member",
            note: "Click to view profile",
            roleLabel: "Role",
            roleValue: "Member",
            description: "Contributed to the project development and system documentation."
          },
          comia: {
            label: "Member",
            note: "Click to view profile",
            roleLabel: "Role",
            roleValue: "Member",
            description: "Supported the team in preparing the final system and defense materials."
          }
        }
      },
      calculator: {
        tag: "Calculator",
        title: "Solve a Division Problem",
        dividendLabel: "Dividend (a)",
        dividendPlaceholder: "Enter dividend",
        dividendHint: "Any integer is allowed.",
        divisorLabel: "Divisor (b)",
        divisorPlaceholder: "Enter positive divisor",
        divisorHint: "The divisor must be a positive integer.",
        compute: "Compute & Save",
        clear: "Clear",
        helperTitle: "What happens here",
        helperItems: [
          "Validates the inputs and blocks division by zero.",
          "Computes quotient and remainder using the Division Algorithm.",
          "Saves each computation for later review."
        ]
      },
      result: {
        tag: "Results",
        title: "Instant Solution",
        storagePill: "Saved history",
        readyBadge: "Ready",
        emptyTitle: "No computation yet",
        emptyCopy: "Enter a dividend and divisor, then press Compute & Save to see the quotient, remainder, and verification steps.",
        dividend: "Dividend",
        divisor: "Divisor",
        verification: "Verification",
        quotient: "Quotient (q)",
        remainder: "Remainder (r)",
        formulaTitle: "Solved Equation",
        explanationTitle: "Explanation",
        methodsTitle: "Other Methods",
        methodsPlaceholder: "Other solving methods will appear here after a computation.",
        valid: "Valid",
        check: "Check",
        reconstructedLabel: "Reconstructed",
        checkNote: "Computed with floor division and verified using the Division Algorithm. Reconstructed value: {value}."
      },
      steps: {
        tag: "Process",
        title: "Step-by-Step Solution",
        hint: "Fade and slide transitions guide the solution",
        placeholder: "Steps will appear here after the first computation."
      },
      history: {
        tag: "History",
        title: "Saved Computations",
        note: "Create, read, update, and delete saved computations.",
        clearAll: "Clear All",
        count: function (count) {
          return count === 1 ? "1 record" : `${count} records`;
        },
        headers: ["#", "Dividend", "Divisor", "Quotient", "Remainder", "Saved / Updated", "Actions"],
        empty: "No records yet. Computations you save will appear here.",
        edit: "Edit",
        delete: "Delete"
      },
      modal: {
        tag: "Update",
        title: "Edit Saved Computation",
        dividendLabel: "Dividend (a)",
        divisorLabel: "Divisor (b)",
        note: "Updating a record recomputes the quotient and remainder automatically.",
        cancel: "Cancel",
        update: "Update Record",
        close: "Close"
      },
      messages: {
        invalidNumbers: "Please enter whole numbers for both dividend and divisor.",
        invalidDivisor: "The divisor must be a positive integer greater than zero.",
        saveStorage: "Unable to save the record. Please allow browser storage and try again.",
        saveSuccess: "Computation saved to history.",
        updateStorage: "Unable to save the record. Please allow browser storage and try again.",
        updateSuccess: "Record updated successfully.",
        missingRecord: "The selected record could not be found.",
        missingHistory: "This record no longer exists in history.",
        deleteStorage: "Unable to update saved history. Delete was canceled.",
        deleteSuccess: "Record deleted from history.",
        noRecords: "There are no records to clear.",
        clearConfirm: "Clear all saved computations from history?",
        clearStorage: "Unable to clear saved history. Nothing was deleted.",
        clearSuccess: "All history records have been cleared.",
        deleteConfirm: function (record) {
          return `Delete this computation?\n\nDividend: ${record.dividend}\nDivisor: ${record.divisor}`;
        }
      },
      explanation: {
        formalRuleGeneral: "For any integer a and positive integer b, there exist unique integers q and r such that a = bq + r and 0 <= r < b.",
        formalRuleNegative: "The original formal statement of the Division Algorithm requires that the divisor b be positive (b > 0). Even when the dividend a is negative, the remainder must still satisfy 0 <= r < b.",
        whyGeneral: "The dividend is nonnegative, so floor division keeps the quotient as the largest whole number not exceeding a / b while the remainder stays inside the required range.",
        whyNegative: "The dividend is negative, so the quotient becomes negative. To keep the remainder valid, the system uses floor division, which chooses the greatest integer less than or equal to a / b.",
        stepGeneral1: "Use floor division: q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepGeneral2: "Multiply the divisor by the quotient: {b} * {q} = {multiple}.",
        stepGeneral3: "Subtract to get the remainder: {a} - ({multiple}) = {r}.",
        stepNegative1: "Find the quotient first: q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepNegative2: "Use that quotient to get the nearest lower multiple of the divisor: {b} * ({q}) = {multiple}.",
        stepNegative3: "Subtract the multiple from the dividend: {a} - ({multiple}) = {r}.",
        conclusionGeneral: "Final answer: {a} = {b}({q}) + {r}. The reconstruction check gives {reconstructed}, and the remainder rule stays true because 0 <= {r} < {b}.",
        conclusionNegative: "Final answer: {a} = {b}({q}) + {r}. The reconstruction check gives {reconstructed}, and the remainder rule stays true because 0 <= {r} < {b}."
      },
      methods: {
        floor: {
          title: "Floor division method",
          text: "Compute q = floor(a / b), then use r = a - bq. For this result, q = {q} and r = {r}."
        },
        lowerMultiple: {
          title: "Nearest lower multiple method",
          text: "Find the multiple of {b} that is closest to {a} but not greater than it. Here, that multiple is {multiple}, which gives the remainder {r}."
        },
        verify: {
          title: "Verification method",
          text: "Check the answer by rebuilding the dividend: {a} = {b}({q}) + {r}, then confirm that 0 <= {r} < {b}."
        }
      }
    },
    fil: {
      pageTitle: "Sistema ng Division Algorithm",
      metaDescription: "Isang responsive na Division Algorithm calculator na may na-save na history, edit, update, at delete.",
      heroKicker: "Interactive Math System",
      heroTitle: "Sistema ng Division Algorithm",
      heroCopy: "Dito magsimula, tapos ipakita ang paliwanag ng Division Algorithm at tuklasin ang mga profile bago lumalim sa system.",
      getStarted: "Magsimula",
      calculatorShortcutKicker: "Mabilis na Access",
      calculatorShortcutTitle: "Buksan ang Calculator",
      calculatorShortcutAria: "Pumunta sa calculator",
      languageLabel: "Wika",
      languageOptions: {
        en: "Ingles",
        fil: "Filipino"
      },
      heroInsights: [
        {
          label: "Maikling Kasaysayan",
          copy: "Matagal nang ginagamit ang Division Algorithm sa number theory upang ipakita kung paano maisusulat ang bawat integer gamit ang divisor, quotient, at remainder."
        },
        {
          label: "Paglalarawan",
          copy: "Ginagawang interactive ng system na ito ang konsepto sa pamamagitan ng calculator na nagpapakita ng sagot, paliwanag, at mga na-save na tala sa iisang lugar."
        },
        {
          label: "Mahahalagang Katotohanan",
          copy: "Sinusunod nito ang a = bq + r, dapat positibo ang divisor, at ang remainder ay dapat tumupad sa 0 <= r < b."
        }
      ],
      coreAlgorithmLabel: "Pangunahing Pormula",
      coreAlgorithmNote: "Isang learning tool na ginawang mas makita, organisado, at madaling balikan ang paghahati.",
      intro: {
        tag: "Pangkalahatan",
        title: "Ano ang Division Algorithm?",
        text: "Ipinapaliwanag ng Division Algorithm kung paano hinahati ang isang numero sa iba pa sa pamamagitan ng quotient at remainder. Tinitiyak nito na ang remainder ay laging mas maliit kaysa sa divisor, kaya kumpleto at madaling ma-verify ang sagot.",
        points: [
          "Ipinapakita nito kung paano hinahati ang dividend sa pantay na bahagi.",
          "Ibinibigay nito ang quotient at remainder.",
          "Tumutulong itong i-verify kung tama ang sagot."
        ],
        viewTeam: "Tingnan ang Mga Profile",
        coreIdeaLabel: "Pangunahing Ideya",
        coreIdeaNote: "Ang remainder ay dapat laging mas mababa kaysa sa divisor."
      },
      team: {
        tag: "Mga Profile",
        title: "Propesor at Developer Team",
        hint: "Pindutin ang card para umusad ang mga detalye",
        professorGroupTitle: "Propesor",
        professorGroupNote: "Ang itinalagang propesor na gumabay at nagpagawa ng system.",
        studentGroupTitle: "Developer Team",
        studentGroupNote: "Si Antonio ang team leader ng developer team, habang ang natitirang mga miyembro ay sumusuporta sa pagbuo at presentasyon ng system.",
        professor: {
          label: "Propesor",
          note: "Propesor na namamahala sa presentasyon ng system",
          roleLabel: "Tungkulin",
          roleValue: "Propesor",
          description: "Ang propesor na nagpagawa ng proyekto at siyang pagbibigyan ng pinal na presentasyon at depensa."
        },
        members: {
          antonio: {
            label: "Team Leader",
            note: "Pindutin para makita ang profile",
            roleLabel: "Tungkulin",
            roleValue: "Team Leader",
            description: "Namumuno sa pangkat sa pagbuo at presentasyon ng Division Algorithm System."
          },
          ronald: {
            label: "Miyembro",
            note: "Pindutin para makita ang profile",
            roleLabel: "Tungkulin",
            roleValue: "Miyembro",
            description: "Bahagi ng pangkat na responsable sa pagbuo at presentasyon ng system."
          },
          jaynielle: {
            label: "Miyembro",
            note: "Pindutin para makita ang profile",
            roleLabel: "Tungkulin",
            roleValue: "Miyembro",
            description: "Nag-ambag sa pagbuo ng proyekto at dokumentasyon ng system."
          },
          comia: {
            label: "Miyembro",
            note: "Pindutin para makita ang profile",
            roleLabel: "Tungkulin",
            roleValue: "Miyembro",
            description: "Sumuporta sa pangkat sa paghahanda ng final system at mga materyales sa depensa."
          }
        }
      },
      calculator: {
        tag: "Kalkulador",
        title: "Lutasin ang Problema sa Division",
        dividendLabel: "Dividend (a)",
        dividendPlaceholder: "Ilagay ang dividend",
        dividendHint: "Maaaring kahit anong buong bilang.",
        divisorLabel: "Divisor (b)",
        divisorPlaceholder: "Ilagay ang positibong divisor",
        divisorHint: "Dapat positibong buong bilang ang divisor.",
        compute: "Kalkulahin at I-save",
        clear: "Linisin",
        helperTitle: "Ano ang mangyayari dito",
        helperItems: [
          "Bine-verify ang input at hinaharangan ang division by zero.",
          "Kinukuwenta ang quotient at remainder gamit ang Division Algorithm.",
          "Sinesave ang bawat computation para mabalikan."
        ]
      },
      result: {
        tag: "Mga Resulta",
        title: "Agad na Solusyon",
        storagePill: "Na-save na history",
        readyBadge: "Handa",
        emptyTitle: "Wala pang computation",
        emptyCopy: "Ilagay ang dividend at divisor, tapos pindutin ang Kalkulahin at I-save para makita ang quotient, remainder, at mga verification step.",
        dividend: "Dividend",
        divisor: "Divisor",
        verification: "Beripikasyon",
        quotient: "Quotient (q)",
        remainder: "Remainder (r)",
        formulaTitle: "Nabuong Equation",
        explanationTitle: "Paliwanag",
        methodsTitle: "Ibang Paraan",
        methodsPlaceholder: "Lalabas dito ang ibang paraan ng pag-solve pagkatapos ng computation.",
        valid: "Wasto",
        check: "Suriin",
        reconstructedLabel: "Nabuo",
        checkNote: "Kinuwenta gamit ang floor division at sinuri gamit ang Division Algorithm. Nabuo ang value: {value}."
      },
      steps: {
        tag: "Proseso",
        title: "Hakbang-Hakbang na Solusyon",
        hint: "Ginagabayan ng fade at slide transitions ang solusyon",
        placeholder: "Lalabas dito ang mga hakbang pagkatapos ng unang computation."
      },
      history: {
        tag: "Kasaysayan",
        title: "Mga Na-save na Computation",
        note: "Gumawa, magbasa, mag-update, at mag-delete ng mga naka-save na computation.",
        clearAll: "Burahin Lahat",
        count: function (count) {
          return `${count} na tala`;
        },
        headers: ["#", "Dividend", "Divisor", "Quotient", "Remainder", "Na-save / Na-update", "Mga Aksyon"],
        empty: "Wala pang record. Lalabas dito ang mga computation na ise-save mo.",
        edit: "I-edit",
        delete: "Burahin"
      },
      modal: {
        tag: "I-update",
        title: "I-edit ang Na-save na Computation",
        dividendLabel: "Dividend (a)",
        divisorLabel: "Divisor (b)",
        note: "Kapag nag-update ng record, awtomatikong kino-compute muli ang quotient at remainder.",
        cancel: "Kanselahin",
        update: "I-update ang Record",
        close: "Isara"
      },
      messages: {
        invalidNumbers: "Maglagay ng buong bilang para sa dividend at divisor.",
        invalidDivisor: "Ang divisor ay dapat positibong buong bilang na mas malaki sa zero.",
        saveStorage: "Hindi ma-save ang record. Pahintulutan ang browser storage at subukang muli.",
        saveSuccess: "Na-save na sa history ang computation.",
        updateStorage: "Hindi ma-save ang record. Pahintulutan ang browser storage at subukang muli.",
        updateSuccess: "Matagumpay na na-update ang record.",
        missingRecord: "Hindi makita ang napiling record.",
        missingHistory: "Wala na ang record na ito sa history.",
        deleteStorage: "Hindi ma-update ang naka-save na history. Kinansela ang pag-delete.",
        deleteSuccess: "Nabura na ang record sa history.",
        noRecords: "Wala pang mga record na maaaring burahin.",
        clearConfirm: "Burahin lahat ng naka-save na computation sa history?",
        clearStorage: "Hindi ma-clear ang naka-save na history. Walang nabura.",
        clearSuccess: "Nabura na ang lahat ng record sa history.",
        deleteConfirm: function (record) {
          return `Burahin ang computation na ito?\n\nDividend: ${record.dividend}\nDivisor: ${record.divisor}`;
        }
      },
      explanation: {
        formalRuleGeneral: "Para sa anumang integer a at positibong integer b, may natatanging integers q at r na tumutupad sa a = bq + r at 0 <= r < b.",
        formalRuleNegative: "Ang orihinal na pormal na pahayag ng Division Algorithm ay nangangailangan na positibo ang divisor b (b > 0). Kahit negative ang dividend a, kailangan pa ring sundin ang kondisyon na 0 <= r < b.",
        whyGeneral: "Kung hindi negatibo ang dividend, sapat ang floor division para makuha ang quotient habang nananatili sa tamang range ang remainder.",
        whyNegative: "Negative ang dividend, kaya negative din ang quotient. Para manatiling valid ang remainder, gumagamit ang system ng floor division na pumipili ng pinakamalaking integer na mas mababa o kapantay ng a / b.",
        stepGeneral1: "Gamitin ang floor division: q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepGeneral2: "Imultiply ang divisor sa quotient: {b} * {q} = {multiple}.",
        stepGeneral3: "Ibawas para makuha ang remainder: {a} - ({multiple}) = {r}.",
        stepNegative1: "Kunin muna ang quotient: q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepNegative2: "Gamitin ang quotient para makuha ang pinakamababang multiple ng divisor: {b} * ({q}) = {multiple}.",
        stepNegative3: "Ibawas ang multiple sa dividend: {a} - ({multiple}) = {r}.",
        conclusionGeneral: "Huling sagot: {a} = {b}({q}) + {r}. Ang check ng reconstruction ay {reconstructed}, at tama ang rule para sa remainder dahil 0 <= {r} < {b}.",
        conclusionNegative: "Huling sagot: {a} = {b}({q}) + {r}. Ang check ng reconstruction ay {reconstructed}, at tama ang rule para sa remainder dahil 0 <= {r} < {b}."
      },
      methods: {
        floor: {
          title: "Paraan ng floor division",
          text: "Kunin ang q = floor(a / b), tapos gamitin ang r = a - bq. Sa resultang ito, q = {q} at r = {r}."
        },
        lowerMultiple: {
          title: "Paraan ng pinakamababang multiple",
          text: "Hanapin ang multiple ng {b} na pinakamalapit sa {a} pero hindi lalagpas dito. Dito, ang multiple ay {multiple}, kaya ang remainder ay {r}."
        },
        verify: {
          title: "Paraan ng beripikasyon",
          text: "Suriin ang sagot sa pamamagitan ng pagbuo ulit ng dividend: {a} = {b}({q}) + {r}, tapos tiyaking 0 <= {r} < {b}."
        }
      }
    }
  };

  const EXTRA_COPY = {};
  const EXPLANATION_HEADINGS = {
    en: {
      formal: "Formal rule",
      why: "Why this works",
      step: "Step-by-step thinking",
      conclusion: "Conclusion"
    },
    fil: {
      formal: "Pormal na panuntunan",
      why: "Bakit gumagana",
      step: "Hakbang-hakbang na pag-iisip",
      conclusion: "Konklusyon"
    },
    es: {
      formal: "Regla formal",
      why: "Por qué funciona",
      step: "Pensamiento paso a paso",
      conclusion: "Conclusión"
    },
    fr: {
      formal: "Règle formelle",
      why: "Pourquoi cela fonctionne",
      step: "Raisonnement étape par étape",
      conclusion: "Conclusion"
    },
    zh: {
      formal: "正式规则",
      why: "为什么可行",
      step: "逐步思考",
      conclusion: "结论"
    },
    ja: {
      formal: "正式な規則",
      why: "なぜうまくいくか",
      step: "段階的な考え方",
      conclusion: "結論"
    },
    ko: {
      formal: "정식 규칙",
      why: "왜 이렇게 되는가",
      step: "단계별 생각",
      conclusion: "결론"
    },
    ar: {
      formal: "القاعدة الرسمية",
      why: "لماذا يعمل",
      step: "تفكير خطوة بخطوة",
      conclusion: "الخلاصة"
    },
    hi: {
      formal: "औपचारिक नियम",
      why: "यह क्यों काम करता है",
      step: "चरण-दर-चरण सोच",
      conclusion: "निष्कर्ष"
    },
    pt: {
      formal: "Regra formal",
      why: "Por que funciona",
      step: "Pensamento passo a passo",
      conclusion: "Conclusão"
    },
    de: {
      formal: "Formale Regel",
      why: "Warum es funktioniert",
      step: "Schritt-für-Schritt-Denken",
      conclusion: "Fazit"
    },
    id: {
      formal: "Aturan formal",
      why: "Mengapa ini berhasil",
      step: "Pemikiran langkah demi langkah",
      conclusion: "Kesimpulan"
    },
    vi: {
      formal: "Quy tắc chính thức",
      why: "Vì sao điều này đúng",
      step: "Suy nghĩ từng bước",
      conclusion: "Kết luận"
    }
  };
  const STEP_TEMPLATES = {
    en: [
      "Start with dividend a = {dividend} and divisor b = {divisor}.",
      "Apply floor division: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Compute the remainder using r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Check the Division Algorithm: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Verify the bound: 0 <= {remainder} < {divisor}."
    ],
    fil: [
      "Simulan sa dividend a = {dividend} at divisor b = {divisor}.",
      "Gamitin ang floor division: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Kunin ang remainder gamit ang r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "I-check ang Division Algorithm: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Tiyaking 0 <= {remainder} < {divisor}."
    ],
    es: [
      "Comienza con el dividendo a = {dividend} y el divisor b = {divisor}.",
      "Aplica la división por piso: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Calcula el resto con r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Comprueba el algoritmo de la división: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Verifica el límite: 0 <= {remainder} < {divisor}."
    ],
    fr: [
      "Commence avec le dividende a = {dividend} et le diviseur b = {divisor}.",
      "Applique la division par défaut: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Calcule le reste avec r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Vérifie l'algorithme de la division: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Vérifie la borne: 0 <= {remainder} < {divisor}."
    ],
    zh: [
      "先从被除数 a = {dividend} 和除数 b = {divisor} 开始。",
      "使用向下取整除法：q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}。",
      "用 r = a - bq 计算余数：r = {dividend} - ({divisor} * {quotient}) = {remainder}。",
      "检查除法算法：{dividend} = {divisor} * {quotient} + {remainder}。",
      "验证范围：0 <= {remainder} < {divisor}。"
    ],
    ja: [
      "被除数 a = {dividend} と除数 b = {divisor} から始めます。",
      "床関数による除算を使います: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}。",
      "r = a - bq で余りを求めます: r = {dividend} - ({divisor} * {quotient}) = {remainder}。",
      "割り算の法則を確認します: {dividend} = {divisor} * {quotient} + {remainder}。",
      "範囲を確認します: 0 <= {remainder} < {divisor}。"
    ],
    ko: [
      "피제수 a = {dividend}와 제수 b = {divisor}부터 시작합니다.",
      "내림 나눗셈을 사용합니다: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "r = a - bq로 나머지를 구합니다: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "나눗셈 알고리즘을 확인합니다: {dividend} = {divisor} * {quotient} + {remainder}.",
      "범위를 확인합니다: 0 <= {remainder} < {divisor}."
    ],
    ar: [
      "ابدأ بالمقسوم a = {dividend} والمقسوم عليه b = {divisor}.",
      "استخدم القسمة مع التقريب للأسفل: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "احسب الباقي باستخدام r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "تحقق من خوارزمية القسمة: {dividend} = {divisor} * {quotient} + {remainder}.",
      "تحقق من الشرط: 0 <= {remainder} < {divisor}."
    ],
    hi: [
      "भाज्य a = {dividend} और भाजक b = {divisor} से शुरू करें।",
      "floor division का उपयोग करें: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "r = a - bq से शेष निकालें: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Division Algorithm जांचें: {dividend} = {divisor} * {quotient} + {remainder}.",
      "सीमा जांचें: 0 <= {remainder} < {divisor}."
    ],
    pt: [
      "Comece com o dividendo a = {dividend} e o divisor b = {divisor}.",
      "Use a divisão por piso: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Calcule o resto com r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Verifique o algoritmo da divisão: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Confira o limite: 0 <= {remainder} < {divisor}."
    ],
    de: [
      "Beginne mit dem Dividend a = {dividend} und dem Divisor b = {divisor}.",
      "Verwende die Abrundungsdivision: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Berechne den Rest mit r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Prüfe den Divisionsalgorithmus: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Prüfe die Grenze: 0 <= {remainder} < {divisor}."
    ],
    id: [
      "Mulai dengan dividend a = {dividend} dan divisor b = {divisor}.",
      "Gunakan pembagian lantai: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Hitung sisa dengan r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Periksa algoritma pembagian: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Periksa batasnya: 0 <= {remainder} < {divisor}."
    ],
    vi: [
      "Bắt đầu với số bị chia a = {dividend} và số chia b = {divisor}.",
      "Dùng phép chia lấy sàn: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Tính số dư bằng r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Kiểm tra thuật toán chia: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Kiểm tra giới hạn: 0 <= {remainder} < {divisor}."
    ]
  };

  Object.assign(EXTRA_COPY, {
    es: {
      pageTitle: "Sistema del algoritmo de división",
      metaDescription: "Una calculadora responsiva del algoritmo de división con historial guardado, editar, actualizar y eliminar.",
      heroKicker: "Sistema matemático interactivo",
      heroTitle: "Sistema del algoritmo de división",
      heroCopy: "Empieza aquí, luego muestra la explicación del algoritmo de división y explora los perfiles antes de entrar al sistema.",
      getStarted: "Empezar",
      languageLabel: "Idioma",
      heroChips: [
        "Resultados inmediatos",
        "Pasos claros",
        "Historial guardado",
        "Perfiles animados"
      ],
      coreAlgorithmLabel: "Algoritmo principal",
      coreAlgorithmNote: "Una herramienta de aprendizaje para hacer la división visible, organizada y fácil de revisar después.",
      intro: {
        tag: "Resumen",
        title: "¿Qué es el algoritmo de división?",
        text: "El algoritmo de división explica cómo dividir un número entre otro obteniendo un cociente y un resto. El resto siempre debe ser menor que el divisor.",
        points: [
          "Muestra cómo el dividendo se reparte en partes iguales.",
          "Da el cociente y el resto.",
          "Ayuda a verificar si la respuesta es correcta."
        ],
        viewTeam: "Ver perfiles",
        coreIdeaLabel: "Idea principal",
        coreIdeaNote: "El resto siempre debe ser menor que el divisor."
      },
      team: {
        tag: "Perfiles",
        title: "Profesor y miembros",
        hint: "Haz clic en una tarjeta para mostrar los detalles",
        professor: {
          label: "Profesor",
          note: "Profesor del proyecto y guía de presentación",
          roleLabel: "Rol",
          roleValue: "Profesor"
        },
        members: {
          antonio: {
            label: "Miembro del proyecto",
            note: "Haz clic para ver el perfil",
            roleLabel: "Rol",
            roleValue: "Miembro del proyecto"
          },
          ronald: {
            label: "Miembro del proyecto",
            note: "Haz clic para ver el perfil",
            roleLabel: "Rol",
            roleValue: "Miembro del proyecto"
          },
          jaynielle: {
            label: "Miembro del proyecto",
            note: "Haz clic para ver el perfil",
            roleLabel: "Rol",
            roleValue: "Miembro del proyecto"
          },
          comia: {
            label: "Miembro del proyecto",
            note: "Haz clic para ver el perfil",
            roleLabel: "Rol",
            roleValue: "Miembro del proyecto"
          }
        }
      },
      calculator: {
        tag: "Calculadora",
        title: "Resolver un problema de división",
        dividendLabel: "Dividendo (a)",
        dividendPlaceholder: "Ingresa el dividendo",
        dividendHint: "Se permite cualquier número entero.",
        divisorLabel: "Divisor (b)",
        divisorPlaceholder: "Ingresa un divisor positivo",
        divisorHint: "El divisor debe ser un entero positivo.",
        compute: "Calcular y guardar",
        clear: "Limpiar",
        helperTitle: "Qué sucede aquí",
        helperItems: [
          "Valida los datos y bloquea la división entre cero.",
          "Calcula cociente y resto usando el algoritmo de división.",
          "Guarda cada cálculo para revisarlo después."
        ]
      },
      result: {
        tag: "Resultados",
        title: "Solución instantánea",
        storagePill: "Historial guardado",
        readyBadge: "Listo",
        emptyTitle: "Aún no hay cálculo",
        emptyCopy: "Ingresa un dividendo y un divisor, luego presiona Calcular y guardar para ver el cociente, el resto y los pasos de verificación.",
        dividend: "Dividendo",
        divisor: "Divisor",
        verification: "Verificación",
        quotient: "Cociente (q)",
        remainder: "Resto (r)",
        formulaTitle: "Ecuación resuelta",
        explanationTitle: "Explicación",
        methodsTitle: "Otros métodos",
        methodsPlaceholder: "Aquí aparecerán otros métodos de solución después de un cálculo.",
        valid: "Válido",
        check: "Revisar",
        reconstructedLabel: "Reconstruido",
        checkNote: "Calculado con división por piso y verificado usando el algoritmo de división. Valor reconstruido: {value}."
      },
      steps: {
        tag: "Proceso",
        title: "Solución paso a paso",
        hint: "Las transiciones fade y slide guían la solución",
        placeholder: "Los pasos aparecerán aquí después del primer cálculo."
      },
      history: {
        tag: "Historial",
        title: "Cálculos guardados",
        note: "Crear, leer, actualizar y eliminar cálculos guardados.",
        clearAll: "Borrar todo",
        count: function (count) {
          return count === 1 ? "1 registro" : `${count} registros`;
        },
        headers: ["#", "Dividendo", "Divisor", "Cociente", "Resto", "Guardado / actualizado", "Acciones"],
        empty: "Aún no hay registros. Los cálculos guardados aparecerán aquí.",
        edit: "Editar",
        delete: "Eliminar"
      },
      modal: {
        tag: "Actualizar",
        title: "Editar cálculo guardado",
        dividendLabel: "Dividendo (a)",
        divisorLabel: "Divisor (b)",
        note: "Al actualizar un registro, se recalculan automáticamente el cociente y el resto.",
        cancel: "Cancelar",
        update: "Actualizar registro",
        close: "Cerrar"
      },
      messages: {
        invalidNumbers: "Ingresa números enteros para el dividendo y el divisor.",
        invalidDivisor: "El divisor debe ser un entero positivo mayor que cero.",
        saveStorage: "No se puede guardar el registro. Permite el almacenamiento del navegador y vuelve a intentarlo.",
        saveSuccess: "El cálculo se guardó en el historial.",
        updateStorage: "No se puede guardar el registro. Permite el almacenamiento del navegador y vuelve a intentarlo.",
        updateSuccess: "El registro se actualizó correctamente.",
        missingRecord: "No se encontró el registro seleccionado.",
        missingHistory: "Este registro ya no existe en el historial.",
        deleteStorage: "No se pudo actualizar el historial guardado. Se canceló la eliminación.",
        deleteSuccess: "El registro se eliminó del historial.",
        noRecords: "No hay registros para borrar.",
        clearConfirm: "¿Borrar todos los cálculos guardados del historial?",
        clearStorage: "No se pudo borrar el historial guardado. No se eliminó nada.",
        clearSuccess: "Se borraron todos los registros del historial.",
        deleteConfirm: function (record) {
          return `¿Eliminar este cálculo?\n\nDividendo: ${record.dividend}\nDivisor: ${record.divisor}`;
        }
      },
      explanation: {
        formalRuleGeneral: "Para cualquier entero a y entero positivo b, existen enteros únicos q y r tales que a = bq + r y 0 <= r < b.",
        formalRuleNegative: "La formulación formal del algoritmo de división exige que el divisor b sea positivo (b > 0). Aunque el dividendo a sea negativo, el resto debe cumplir 0 <= r < b.",
        whyGeneral: "Como el dividendo no es negativo, la división por piso mantiene el cociente como el mayor entero que no supera a / b y el resto queda en el rango correcto.",
        whyNegative: "Como el dividendo es negativo, el cociente también es negativo. Para conservar un resto válido, el sistema usa división por piso, que elige el mayor entero menor o igual que a / b.",
        stepGeneral1: "Usa división por piso: q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepGeneral2: "Multiplica el divisor por el cociente: {b} * {q} = {multiple}.",
        stepGeneral3: "Resta para obtener el resto: {a} - ({multiple}) = {r}.",
        stepNegative1: "Primero encuentra el cociente: q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepNegative2: "Usa ese cociente para obtener el múltiplo inferior más cercano del divisor: {b} * ({q}) = {multiple}.",
        stepNegative3: "Resta el múltiplo del dividendo: {a} - ({multiple}) = {r}.",
        conclusionGeneral: "Respuesta final: {a} = {b}({q}) + {r}. La comprobación da {reconstructed} y la regla del resto sigue siendo válida porque 0 <= {r} < {b}.",
        conclusionNegative: "Respuesta final: {a} = {b}({q}) + {r}. La comprobación da {reconstructed} y la regla del resto sigue siendo válida porque 0 <= {r} < {b}."
      },
      methods: {
        floor: {
          title: "Método de división por piso",
          text: "Calcula q = floor(a / b) y luego usa r = a - bq. En este resultado, q = {q} y r = {r}."
        },
        lowerMultiple: {
          title: "Método del múltiplo inferior más cercano",
          text: "Busca el múltiplo de {b} más cercano a {a} sin pasarse. Aquí, ese múltiplo es {multiple}, y el resto es {r}."
        },
        verify: {
          title: "Método de verificación",
          text: "Comprueba la respuesta reconstruyendo el dividendo: {a} = {b}({q}) + {r}, y confirma que 0 <= {r} < {b}."
        }
      }
    },
    fr: {
      pageTitle: "Système de l'algorithme de la division",
      metaDescription: "Une calculatrice réactive de l'algorithme de la division avec historique enregistré, modification et suppression.",
      heroKicker: "Système mathématique interactif",
      heroTitle: "Système de l'algorithme de la division",
      heroCopy: "Commence ici, puis affiche l'explication de l'algorithme de la division et explore les profils avant d'aller plus loin.",
      getStarted: "Commencer",
      languageLabel: "Langue",
      heroChips: [
        "Résultats instantanés",
        "Étapes claires",
        "Historique enregistré",
        "Profils animés"
      ],
      coreAlgorithmLabel: "Algorithme principal",
      coreAlgorithmNote: "Un outil d'apprentissage pour rendre la division visible, organisée et facile à revoir plus tard.",
      intro: {
        tag: "Aperçu",
        title: "Qu'est-ce que l'algorithme de la division ?",
        text: "L'algorithme de la division explique comment diviser un nombre par un autre en obtenant un quotient et un reste. Le reste doit toujours être plus petit que le diviseur.",
        points: [
          "Il montre comment le dividende est partagé en parts égales.",
          "Il donne le quotient et le reste.",
          "Il aide à vérifier si la réponse est correcte."
        ],
        viewTeam: "Voir les profils",
        coreIdeaLabel: "Idée principale",
        coreIdeaNote: "Le reste doit toujours être inférieur au diviseur."
      },
      team: {
        tag: "Profils",
        title: "Professeur et membres",
        hint: "Clique sur une carte pour afficher les détails",
        professor: {
          label: "Professeur",
          note: "Professeur du projet et guide de présentation",
          roleLabel: "Rôle",
          roleValue: "Professeur"
        },
        members: {
          antonio: {
            label: "Membre du projet",
            note: "Clique pour voir le profil",
            roleLabel: "Rôle",
            roleValue: "Membre du projet"
          },
          ronald: {
            label: "Membre du projet",
            note: "Clique pour voir le profil",
            roleLabel: "Rôle",
            roleValue: "Membre du projet"
          },
          jaynielle: {
            label: "Membre du projet",
            note: "Clique pour voir le profil",
            roleLabel: "Rôle",
            roleValue: "Membre du projet"
          },
          comia: {
            label: "Membre du projet",
            note: "Clique pour voir le profil",
            roleLabel: "Rôle",
            roleValue: "Membre du projet"
          }
        }
      },
      calculator: {
        tag: "Calculatrice",
        title: "Résoudre un problème de division",
        dividendLabel: "Dividende (a)",
        dividendPlaceholder: "Saisir le dividende",
        dividendHint: "N'importe quel entier est autorisé.",
        divisorLabel: "Diviseur (b)",
        divisorPlaceholder: "Saisir un diviseur positif",
        divisorHint: "Le diviseur doit être un entier positif.",
        compute: "Calculer et enregistrer",
        clear: "Effacer",
        helperTitle: "Ce qui se passe ici",
        helperItems: [
          "Valide les entrées et bloque la division par zéro.",
          "Calcule le quotient et le reste avec l'algorithme de la division.",
          "Enregistre chaque calcul pour le revoir plus tard."
        ]
      },
      result: {
        tag: "Résultats",
        title: "Solution instantanée",
        storagePill: "Historique enregistré",
        readyBadge: "Prêt",
        emptyTitle: "Aucun calcul pour le moment",
        emptyCopy: "Saisis un dividende et un diviseur, puis appuie sur Calculer et enregistrer pour voir le quotient, le reste et les étapes de vérification.",
        dividend: "Dividende",
        divisor: "Diviseur",
        verification: "Vérification",
        quotient: "Quotient (q)",
        remainder: "Reste (r)",
        formulaTitle: "Équation résolue",
        explanationTitle: "Explication",
        methodsTitle: "Autres méthodes",
        methodsPlaceholder: "D'autres méthodes de résolution apparaîtront ici après un calcul.",
        valid: "Valide",
        check: "Vérifier",
        reconstructedLabel: "Reconstruit",
        checkNote: "Calculé avec la division par défaut et vérifié à l'aide de l'algorithme de la division. Valeur reconstruite : {value}."
      },
      steps: {
        tag: "Processus",
        title: "Solution étape par étape",
        hint: "Les transitions fade et slide guident la solution",
        placeholder: "Les étapes apparaîtront ici après le premier calcul."
      },
      history: {
        tag: "Historique",
        title: "Calculs enregistrés",
        note: "Créer, lire, mettre à jour et supprimer les calculs enregistrés.",
        clearAll: "Tout effacer",
        count: function (count) {
          return count === 1 ? "1 enregistrement" : `${count} enregistrements`;
        },
        headers: ["#", "Dividende", "Diviseur", "Quotient", "Reste", "Enregistré / mis à jour", "Actions"],
        empty: "Aucun enregistrement pour le moment. Les calculs enregistrés apparaîtront ici.",
        edit: "Modifier",
        delete: "Supprimer"
      },
      modal: {
        tag: "Mettre à jour",
        title: "Modifier le calcul enregistré",
        dividendLabel: "Dividende (a)",
        divisorLabel: "Diviseur (b)",
        note: "La mise à jour d'un enregistrement recalcule automatiquement le quotient et le reste.",
        cancel: "Annuler",
        update: "Mettre à jour",
        close: "Fermer"
      },
      messages: {
        invalidNumbers: "Saisis des nombres entiers pour le dividende et le diviseur.",
        invalidDivisor: "Le diviseur doit être un entier positif supérieur à zéro.",
        saveStorage: "Impossible d'enregistrer le calcul. Autorise le stockage du navigateur et réessaie.",
        saveSuccess: "Le calcul a été enregistré dans l'historique.",
        updateStorage: "Impossible d'enregistrer le calcul. Autorise le stockage du navigateur et réessaie.",
        updateSuccess: "L'enregistrement a été mis à jour avec succès.",
        missingRecord: "L'enregistrement sélectionné est introuvable.",
        missingHistory: "Cet enregistrement n'existe plus dans l'historique.",
        deleteStorage: "Impossible de mettre à jour l'historique enregistré. La suppression a été annulée.",
        deleteSuccess: "L'enregistrement a été supprimé de l'historique.",
        noRecords: "Aucun enregistrement à effacer.",
        clearConfirm: "Effacer tous les calculs enregistrés de l'historique ?",
        clearStorage: "Impossible d'effacer l'historique enregistré. Rien n'a été supprimé.",
        clearSuccess: "Tous les enregistrements ont été effacés de l'historique.",
        deleteConfirm: function (record) {
          return `Supprimer ce calcul ?\n\nDividende : ${record.dividend}\nDiviseur : ${record.divisor}`;
        }
      },
      explanation: {
        formalRuleGeneral: "Pour tout entier a et tout entier positif b, il existe des entiers uniques q et r tels que a = bq + r et 0 <= r < b.",
        formalRuleNegative: "L'énoncé formel de l'algorithme de la division exige que le diviseur b soit positif (b > 0). Même si le dividende a est négatif, le reste doit encore vérifier 0 <= r < b.",
        whyGeneral: "Comme le dividende est non négatif, la division par défaut garde le quotient comme le plus grand entier ne dépassant pas a / b, tandis que le reste reste dans la bonne plage.",
        whyNegative: "Comme le dividende est négatif, le quotient devient négatif. Pour garder un reste valide, le système utilise la division par défaut, qui choisit le plus grand entier inférieur ou égal à a / b.",
        stepGeneral1: "Utilise la division par défaut : q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepGeneral2: "Multiplie le diviseur par le quotient : {b} * {q} = {multiple}.",
        stepGeneral3: "Soustrais pour obtenir le reste : {a} - ({multiple}) = {r}.",
        stepNegative1: "Trouve d'abord le quotient : q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepNegative2: "Utilise ce quotient pour obtenir le multiple inférieur le plus proche du diviseur : {b} * ({q}) = {multiple}.",
        stepNegative3: "Soustrais le multiple du dividende : {a} - ({multiple}) = {r}.",
        conclusionGeneral: "Réponse finale : {a} = {b}({q}) + {r}. La vérification donne {reconstructed} et la règle du reste reste valide car 0 <= {r} < {b}.",
        conclusionNegative: "Réponse finale : {a} = {b}({q}) + {r}. La vérification donne {reconstructed} et la règle du reste reste valide car 0 <= {r} < {b}."
      },
      methods: {
        floor: {
          title: "Méthode de division par défaut",
          text: "Calcule q = floor(a / b), puis utilise r = a - bq. Pour ce résultat, q = {q} et r = {r}."
        },
        lowerMultiple: {
          title: "Méthode du multiple inférieur le plus proche",
          text: "Cherche le multiple de {b} le plus proche de {a} sans le dépasser. Ici, ce multiple est {multiple}, donc le reste est {r}."
        },
        verify: {
          title: "Méthode de vérification",
          text: "Vérifie la réponse en reconstruisant le dividende : {a} = {b}({q}) + {r}, puis confirme que 0 <= {r} < {b}."
        }
      }
    },
    zh: {
      pageTitle: "除法算法系统",
      metaDescription: "一个响应式除法算法计算器，带已保存历史、编辑、更新和删除功能。",
      heroKicker: "互动数学系统",
      heroTitle: "除法算法系统",
      heroCopy: "从这里开始，然后查看除法算法说明，并在深入系统前浏览成员简介。",
      getStarted: "开始",
      languageLabel: "语言",
      heroChips: [
        "即时结果",
        "清晰步骤",
        "已保存历史",
        "动画简介"
      ],
      coreAlgorithmLabel: "核心公式",
      coreAlgorithmNote: "一个让除法更直观、条理清晰、便于日后复习的学习工具。",
      intro: {
        tag: "概览",
        title: "什么是除法算法？",
        text: "除法算法说明如何把一个数除以另一个数，从而得到商和余数。余数必须始终小于除数。",
        points: [
          "它展示被除数如何被平均分成若干部分。",
          "它会给出商和余数。",
          "它帮助验证答案是否正确。"
        ],
        viewTeam: "查看简介",
        coreIdeaLabel: "核心思想",
        coreIdeaNote: "余数必须始终小于除数。"
      },
      team: {
        tag: "简介",
        title: "教授与成员",
        hint: "点击卡片即可展开详情",
        professor: {
          label: "教授",
          note: "项目教授和展示指导",
          roleLabel: "角色",
          roleValue: "教授"
        },
        members: {
          antonio: {
            label: "项目成员",
            note: "点击查看简介",
            roleLabel: "角色",
            roleValue: "项目成员"
          },
          ronald: {
            label: "项目成员",
            note: "点击查看简介",
            roleLabel: "角色",
            roleValue: "项目成员"
          },
          jaynielle: {
            label: "项目成员",
            note: "点击查看简介",
            roleLabel: "角色",
            roleValue: "项目成员"
          },
          comia: {
            label: "项目成员",
            note: "点击查看简介",
            roleLabel: "角色",
            roleValue: "项目成员"
          }
        }
      },
      calculator: {
        tag: "计算器",
        title: "解决除法问题",
        dividendLabel: "被除数 (a)",
        dividendPlaceholder: "输入被除数",
        dividendHint: "允许任意整数。",
        divisorLabel: "除数 (b)",
        divisorPlaceholder: "输入正整数除数",
        divisorHint: "除数必须是正整数。",
        compute: "计算并保存",
        clear: "清空",
        helperTitle: "这里会发生什么",
        helperItems: [
          "验证输入并阻止除以零。",
          "使用除法算法计算商和余数。",
          "保存每次计算，方便以后查看。"
        ]
      },
      result: {
        tag: "结果",
        title: "即时解答",
        storagePill: "已保存历史",
        readyBadge: "准备好",
        emptyTitle: "尚无计算",
        emptyCopy: "输入被除数和除数，然后按下计算并保存，就可以查看商、余数和验证步骤。",
        dividend: "被除数",
        divisor: "除数",
        verification: "验证",
        quotient: "商 (q)",
        remainder: "余数 (r)",
        formulaTitle: "已求出的等式",
        explanationTitle: "说明",
        methodsTitle: "其他方法",
        methodsPlaceholder: "完成一次计算后，其他求解方法会显示在这里。",
        valid: "有效",
        check: "检查",
        reconstructedLabel: "重建",
        checkNote: "使用向下取整除法计算，并用除法算法验证。重建值：{value}。"
      },
      steps: {
        tag: "过程",
        title: "逐步解答",
        hint: "淡入和滑动过渡会引导解题过程",
        placeholder: "第一次计算后，步骤会显示在这里。"
      },
      history: {
        tag: "历史",
        title: "已保存的计算",
        note: "创建、读取、更新和删除已保存的计算。",
        clearAll: "全部清除",
        count: function (count) {
          return count === 1 ? "1 条记录" : `${count} 条记录`;
        },
        headers: ["#", "被除数", "除数", "商", "余数", "保存 / 更新", "操作"],
        empty: "尚无记录。你保存的计算会显示在这里。",
        edit: "编辑",
        delete: "删除"
      },
      modal: {
        tag: "更新",
        title: "编辑已保存的计算",
        dividendLabel: "被除数 (a)",
        divisorLabel: "除数 (b)",
        note: "更新记录时，会自动重新计算商和余数。",
        cancel: "取消",
        update: "更新记录",
        close: "关闭"
      },
      messages: {
        invalidNumbers: "请输入被除数和除数的整数。",
        invalidDivisor: "除数必须是大于零的正整数。",
        saveStorage: "无法保存记录。请允许浏览器存储后重试。",
        saveSuccess: "计算已保存到历史。",
        updateStorage: "无法保存记录。请允许浏览器存储后重试。",
        updateSuccess: "记录已成功更新。",
        missingRecord: "找不到所选记录。",
        missingHistory: "此记录已不在历史中。",
        deleteStorage: "无法更新已保存的历史。删除已取消。",
        deleteSuccess: "记录已从历史中删除。",
        noRecords: "没有可清除的记录。",
        clearConfirm: "清除历史中的所有已保存计算吗？",
        clearStorage: "无法清除已保存的历史。没有删除任何内容。",
        clearSuccess: "所有历史记录已被清除。",
        deleteConfirm: function (record) {
          return `删除此计算吗？\n\n被除数: ${record.dividend}\n除数: ${record.divisor}`;
        }
      },
      explanation: {
        formalRuleGeneral: "对于任意整数 a 和正整数 b，存在唯一的整数 q 和 r，使得 a = bq + r 且 0 <= r < b。",
        formalRuleNegative: "除法算法的正式定义要求除数 b 必须为正数（b > 0）。即使被除数 a 为负数，余数仍必须满足 0 <= r < b。",
        whyGeneral: "当被除数非负时，向下取整除法会让商保持为不超过 a / b 的最大整数，而余数仍落在正确范围内。",
        whyNegative: "当被除数为负时，商也会变成负数。为了保持余数有效，系统使用向下取整除法，选择小于或等于 a / b 的最大整数。",
        stepGeneral1: "使用向下取整除法：q = floor(a / b) = floor({a} / {b}) = {q}。",
        stepGeneral2: "把除数乘以商：{b} * {q} = {multiple}。",
        stepGeneral3: "相减得到余数：{a} - ({multiple}) = {r}。",
        stepNegative1: "先求商：q = floor(a / b) = floor({a} / {b}) = {q}。",
        stepNegative2: "用这个商得到最接近的下方倍数：{b} * ({q}) = {multiple}。",
        stepNegative3: "用被除数减去该倍数：{a} - ({multiple}) = {r}。",
        conclusionGeneral: "最终答案：{a} = {b}({q}) + {r}。重建检查得到 {reconstructed}，并且余数规则成立，因为 0 <= {r} < {b}。",
        conclusionNegative: "最终答案：{a} = {b}({q}) + {r}。重建检查得到 {reconstructed}，并且余数规则成立，因为 0 <= {r} < {b}。"
      },
      methods: {
        floor: {
          title: "向下取整除法",
          text: "先计算 q = floor(a / b)，再使用 r = a - bq。这个结果中，q = {q}，r = {r}。"
        },
        lowerMultiple: {
          title: "最近的下方倍数法",
          text: "找出不超过 a 的、最接近 a 的 b 的倍数。这里这个倍数是 {multiple}，因此余数是 {r}。"
        },
        verify: {
          title: "验证方法",
          text: "通过重新组成被除数来检查答案：{a} = {b}({q}) + {r}，再确认 0 <= {r} < {b}。"
        }
      }
    }
  });

  Object.assign(EXTRA_COPY, {
    ko: {
      intro: {
        tag: "\uac1c\uc694",
        title: "\ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998\uc774\ub780?",
        text: "\ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998\uc740 \ubaab\uacfc \ub098\uba38\uc9c0\ub97c \ud1b5\ud574 \ud55c \uc218\ub97c \ub2e4\ub978 \uc218\ub85c \ub098\ub204\ub294 \ubc29\ubc95\uc744 \uc124\uba85\ud569\ub2c8\ub2e4.",
        points: [
          "\ud53c\uc81c\uc218\uac00 \uc5b4\ub5bb\uac8c \ub098\ub258\ub294\uc9c0 \ubcf4\uc5ec \uc90d\ub2c8\ub2e4.",
          "\ubaab\uacfc \ub098\uba38\uc9c0\ub97c \ud568\uaed8 \ubcf4\uc5ec \uc90d\ub2c8\ub2e4.",
          "\ub2f5\uc774 \ub9de\ub294\uc9c0 \ud655\uc778\ud558\ub294 \ub370 \ub3c4\uc6c0\uc744 \uc90d\ub2c8\ub2e4."
        ],
        viewTeam: "\ud504\ub85c\ud544 \ubcf4\uae30",
        coreIdeaLabel: "\ud575\uc2ec \uc544\uc774\ub514\uc5b4",
        coreIdeaNote: "\ub098\uba38\uc9c0\ub294 \ud56d\uc0c1 \uc81c\uc218\ubcf4\ub2e4 \uc791\uc544\uc57c \ud569\ub2c8\ub2e4."
      },
      calculator: {
        tag: "\uacc4\uc0b0\uae30",
        title: "\ub098\ub217\uc148 \ubb38\uc81c \ud480\uae30",
        dividendLabel: "\ud53c\uc81c\uc218 (a)",
        dividendPlaceholder: "\ud53c\uc81c\uc218 \uc785\ub825",
        dividendHint: "\uc5b4\ub5a4 \uc815\uc218\ub3c4 \uac00\ub2a5\ud569\ub2c8\ub2e4.",
        divisorLabel: "\uc81c\uc218 (b)",
        divisorPlaceholder: "\uc591\uc758 \uc81c\uc218 \uc785\ub825",
        divisorHint: "\uc81c\uc218\ub294 \uc591\uc758 \uc815\uc218\uc5ec\uc57c \ud569\ub2c8\ub2e4.",
        compute: "\uacc4\uc0b0 \ubc0f \uc800\uc7a5",
        clear: "\uc9c0\uc6b0\uae30",
        helperTitle: "\uc5ec\uae30\uc11c \uc77c\uc5b4\ub098\ub294 \uc77c"
      },
      steps: { tag: "\uacfc\uc815", title: "\ub2e8\uacc4\ubcc4 \ud480\uc774", hint: "fade\uc640 slide \ud6a8\uacfc\uac00 \ud480\uc774 \uacfc\uc815\uc744 \uc548\ub0b4\ud569\ub2c8\ub2e4", placeholder: "\uccab \uacc4\uc0b0 \ud6c4 \ub2e8\uacc4\uac00 \uc5ec\uae30\uc5d0 \ud45c\uc2dc\ub429\ub2c8\ub2e4." },
      history: { tag: "\uae30\ub85d", title: "\uc800\uc7a5\ub41c \uacc4\uc0b0", note: "\uc800\uc7a5\ub41c \uacc4\uc0b0\uc744 \uc0dd\uc131, \uc870\ud68c, \uc218\uc815, \uc0ad\uc81c\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.", clearAll: "\ubaa8\ub450 \uc9c0\uc6b0\uae30", edit: "\uc218\uc815", delete: "\uc0ad\uc81c" },
      modal: { tag: "\uc5c5\ub370\uc774\ud2b8", title: "\uc800\uc7a5\ub41c \uacc4\uc0b0 \uc218\uc815", dividendLabel: "\ud53c\uc81c\uc218 (a)", divisorLabel: "\uc81c\uc218 (b)", cancel: "\ucde8\uc18c", update: "\uae30\ub85d \uc5c5\ub370\uc774\ud2b8", close: "\ub2eb\uae30" }
    },
    ar: {
      intro: {
        tag: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629",
        title: "\u0645\u0627 \u0647\u064a \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0627\u0644\u0642\u0633\u0645\u0629\u061f",
        text: "\u062a\u0634\u0631\u062d \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0627\u0644\u0642\u0633\u0645\u0629 \u0643\u064a\u0641\u064a\u0629 \u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0646\u0627\u062a\u062c \u0642\u0633\u0645\u0629 \u0648\u0628\u0627\u0642\u064a \u0639\u0646\u062f \u0642\u0633\u0645\u0629 \u0639\u062f\u062f \u0639\u0644\u0649 \u0622\u062e\u0631.",
        points: [
          "\u062a\u0648\u0636\u062d \u0643\u064a\u0641 \u064a\u062a\u0645 \u062a\u0642\u0633\u064a\u0645 \u0627\u0644\u0645\u0642\u0633\u0648\u0645.",
          "\u062a\u0639\u0637\u064a \u0646\u0627\u062a\u062c \u0627\u0644\u0642\u0633\u0645\u0629 \u0648\u0627\u0644\u0628\u0627\u0642\u064a.",
          "\u062a\u0633\u0627\u0639\u062f \u0641\u064a \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0635\u062d\u0629 \u0627\u0644\u0625\u062c\u0627\u0628\u0629."
        ],
        viewTeam: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0644\u0641\u0627\u062a",
        coreIdeaLabel: "\u0627\u0644\u0641\u0643\u0631\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629",
        coreIdeaNote: "\u064a\u062c\u0628 \u0623\u0646 \u064a\u0628\u0642\u0649 \u0627\u0644\u0628\u0627\u0642\u064a \u0623\u0635\u063a\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u0633\u0648\u0645 \u0639\u0644\u064a\u0647."
      },
      calculator: {
        tag: "\u0627\u0644\u062d\u0627\u0633\u0628\u0629",
        title: "\u062d\u0644 \u0645\u0633\u0623\u0644\u0629 \u0642\u0633\u0645\u0629",
        dividendLabel: "\u0627\u0644\u0645\u0642\u0633\u0648\u0645 (a)",
        divisorLabel: "\u0627\u0644\u0645\u0642\u0633\u0648\u0645 \u0639\u0644\u064a\u0647 (b)",
        compute: "\u0627\u062d\u0633\u0628 \u0648\u0627\u062d\u0641\u0638",
        clear: "\u0645\u0633\u062d"
      },
      steps: { tag: "\u0627\u0644\u0639\u0645\u0644\u064a\u0629", title: "\u062d\u0644 \u062e\u0637\u0648\u0629 \u0628\u062e\u0637\u0648\u0629", placeholder: "\u0633\u062a\u0638\u0647\u0631 \u0627\u0644\u062e\u0637\u0648\u0627\u062a \u0647\u0646\u0627 \u0628\u0639\u062f \u0623\u0648\u0644 \u0639\u0645\u0644\u064a\u0629 \u062d\u0633\u0627\u0628." },
      history: { tag: "\u0627\u0644\u0633\u062c\u0644", title: "\u0627\u0644\u0639\u0645\u0644\u064a\u0627\u062a \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629", clearAll: "\u0645\u0633\u062d \u0627\u0644\u0643\u0644", edit: "\u062a\u0639\u062f\u064a\u0644", delete: "\u062d\u0630\u0641" },
      modal: { tag: "\u062a\u062d\u062f\u064a\u062b", title: "\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629", cancel: "\u0625\u0644\u063a\u0627\u0621", update: "\u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0633\u062c\u0644", close: "\u0625\u063a\u0644\u0627\u0642" }
    },
    hi: {
      intro: {
        tag: "\u0905\u0935\u0932\u094b\u0915\u0928",
        title: "Division Algorithm \u0915\u094d\u092f\u093e \u0939\u0948?",
        text: "Division Algorithm \u092f\u0939 \u092c\u0924\u093e\u0924\u093e \u0939\u0948 \u0915\u093f \u090f\u0915 \u0938\u0902\u0916\u094d\u092f\u093e \u0915\u094b \u0926\u0942\u0938\u0930\u0940 \u0938\u0902\u0916\u094d\u092f\u093e \u0938\u0947 divide \u0915\u0930\u0928\u0947 \u092a\u0930 quotient \u0914\u0930 remainder \u0915\u0948\u0938\u0947 \u092e\u093f\u0932\u0924\u0947 \u0939\u0948\u0902.",
        points: [
          "\u092f\u0939 \u0926\u093f\u0916\u093e\u0924\u093e \u0939\u0948 \u0915\u093f dividend \u0915\u0948\u0938\u0947 \u092c\u0901\u091f\u0924\u093e \u0939\u0948.",
          "\u092f\u0939 quotient \u0914\u0930 remainder \u0926\u094b\u0928\u094b\u0902 \u0926\u0947\u0924\u093e \u0939\u0948.",
          "\u092f\u0939 answer \u0915\u094b verify \u0915\u0930\u0928\u0947 \u092e\u0947\u0902 \u092e\u0926\u0926 \u0915\u0930\u0924\u093e \u0939\u0948."
        ],
        viewTeam: "Profiles \u0926\u0947\u0916\u0947\u0902"
      },
      calculator: { tag: "\u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091f\u0930", title: "Division problem \u0939\u0932 \u0915\u0930\u0947\u0902", dividendLabel: "\u092d\u093e\u091c\u094d\u092f (a)", divisorLabel: "\u092d\u093e\u091c\u0915 (b)", compute: "\u0917\u0923\u0928\u093e \u0914\u0930 save", clear: "\u0938\u093e\u092b \u0915\u0930\u0947\u0902" },
      steps: { tag: "\u092a\u094d\u0930\u0915\u094d\u0930\u093f\u092f\u093e", title: "Step-by-step \u0938\u092e\u093e\u0927\u093e\u0928", placeholder: "\u092a\u0939\u0932\u0947 computation \u0915\u0947 \u092c\u093e\u0926 steps \u092f\u0939\u093e\u0901 \u0926\u093f\u0916\u0947\u0902\u0917\u0947." },
      history: { tag: "\u0939\u093f\u0938\u094d\u091f\u094d\u0930\u0940", title: "\u0938\u0947\u0935 calculations", clearAll: "\u0938\u092d\u0940 \u0939\u091f\u093e\u090f\u0901", edit: "\u0938\u0902\u092a\u093e\u0926\u093f\u0924 \u0915\u0930\u0947\u0902", delete: "\u0939\u091f\u093e\u090f\u0901" }
    },
    pt: {
      intro: {
        tag: "Vis\u00e3o geral",
        title: "O que \u00e9 o Algoritmo da Divis\u00e3o?",
        text: "O Algoritmo da Divis\u00e3o explica como um n\u00famero pode ser dividido por outro para produzir um quociente e um resto.",
        points: [
          "Mostra como o dividendo \u00e9 separado em partes iguais.",
          "Apresenta o quociente e o resto.",
          "Ajuda a verificar se a resposta est\u00e1 correta."
        ],
        viewTeam: "Ver perfis",
        coreIdeaLabel: "Ideia central",
        coreIdeaNote: "O resto deve sempre ser menor que o divisor."
      },
      calculator: { tag: "Calculadora", title: "Resolver um problema de divis\u00e3o", dividendLabel: "Dividendo (a)", divisorLabel: "Divisor (b)", compute: "Calcular e salvar", clear: "Limpar" },
      steps: { tag: "Processo", title: "Solu\u00e7\u00e3o passo a passo", placeholder: "Os passos aparecer\u00e3o aqui ap\u00f3s o primeiro c\u00e1lculo." },
      history: { tag: "Hist\u00f3rico", title: "C\u00e1lculos salvos", clearAll: "Limpar tudo", edit: "Editar", delete: "Excluir" },
      modal: { tag: "Atualizar", title: "Editar c\u00e1lculo salvo", cancel: "Cancelar", update: "Atualizar registro", close: "Fechar" }
    },
    de: {
      intro: {
        tag: "\u00dcberblick",
        title: "Was ist der Divisionsalgorithmus?",
        text: "Der Divisionsalgorithmus erkl\u00e4rt, wie eine Zahl durch eine andere geteilt wird und dabei Quotient und Rest entstehen.",
        points: [
          "Er zeigt, wie der Dividend in gleiche Teile aufgeteilt wird.",
          "Er gibt Quotient und Rest an.",
          "Er hilft bei der \u00dcberpr\u00fcfung der Antwort."
        ],
        viewTeam: "Profile ansehen",
        coreIdeaLabel: "Kernidee",
        coreIdeaNote: "Der Rest muss immer kleiner als der Divisor sein."
      },
      calculator: { tag: "Rechner", title: "Ein Divisionsproblem l\u00f6sen", dividendLabel: "Dividend (a)", divisorLabel: "Divisor (b)", compute: "Berechnen und speichern", clear: "Leeren" },
      steps: { tag: "Ablauf", title: "Schritt-f\u00fcr-Schritt-L\u00f6sung", placeholder: "Die Schritte erscheinen hier nach der ersten Berechnung." },
      history: { tag: "Verlauf", title: "Gespeicherte Berechnungen", clearAll: "Alles l\u00f6schen", edit: "Bearbeiten", delete: "L\u00f6schen" },
      modal: { tag: "Aktualisieren", title: "Gespeicherte Berechnung bearbeiten", cancel: "Abbrechen", update: "Eintrag aktualisieren", close: "Schlie\u00dfen" }
    },
    id: {
      intro: {
        tag: "Gambaran umum",
        title: "Apa itu Algoritma Pembagian?",
        text: "Algoritma Pembagian menjelaskan bagaimana satu bilangan dibagi dengan bilangan lain untuk menghasilkan quotient dan remainder.",
        points: [
          "Menunjukkan bagaimana dividend dibagi menjadi bagian yang sama.",
          "Menampilkan quotient dan remainder.",
          "Membantu memeriksa apakah jawabannya benar."
        ],
        viewTeam: "Lihat profil",
        coreIdeaLabel: "Gagasan utama",
        coreIdeaNote: "Remainder harus selalu lebih kecil dari divisor."
      },
      calculator: { tag: "Kalkulator", title: "Menyelesaikan soal pembagian", dividendLabel: "Dividend (a)", divisorLabel: "Divisor (b)", compute: "Hitung dan simpan", clear: "Bersihkan" },
      steps: { tag: "Proses", title: "Solusi langkah demi langkah", placeholder: "Langkah-langkah akan muncul di sini setelah perhitungan pertama." },
      history: { tag: "Riwayat", title: "Perhitungan tersimpan", clearAll: "Hapus semua", edit: "Edit", delete: "Hapus" },
      modal: { tag: "Perbarui", title: "Edit perhitungan tersimpan", cancel: "Batal", update: "Perbarui data", close: "Tutup" }
    },
    vi: {
      intro: {
        tag: "T\u1ed5ng quan",
        title: "Thu\u1eadt to\u00e1n Chia l\u00e0 g\u00ec?",
        text: "Thu\u1eadt to\u00e1n Chia gi\u1ea3i th\u00edch c\u00e1ch m\u1ed9t s\u1ed1 \u0111\u01b0\u1ee3c chia cho m\u1ed9t s\u1ed1 kh\u00e1c \u0111\u1ec3 t\u1ea1o ra quotient v\u00e0 remainder.",
        points: [
          "Cho th\u1ea5y c\u00e1ch s\u1ed1 b\u1ecb chia \u0111\u01b0\u1ee3c t\u00e1ch th\u00e0nh c\u00e1c ph\u1ea7n b\u1eb1ng nhau.",
          "Hi\u1ec3n th\u1ecb quotient v\u00e0 remainder.",
          "Gi\u00fap ki\u1ec3m tra xem c\u00e2u tr\u1ea3 l\u1eddi c\u00f3 \u0111\u00fang hay kh\u00f4ng."
        ],
        viewTeam: "Xem h\u1ed3 s\u01a1",
        coreIdeaLabel: "\u00dd ch\u00ednh",
        coreIdeaNote: "S\u1ed1 d\u01b0 lu\u00f4n ph\u1ea3i nh\u1ecf h\u01a1n s\u1ed1 chia."
      },
      calculator: { tag: "M\u00e1y t\u00ednh", title: "Gi\u1ea3i b\u00e0i to\u00e1n chia", dividendLabel: "S\u1ed1 b\u1ecb chia (a)", divisorLabel: "S\u1ed1 chia (b)", compute: "T\u00ednh v\u00e0 l\u01b0u", clear: "X\u00f3a" },
      steps: { tag: "Quy tr\u00ecnh", title: "L\u1eddi gi\u1ea3i t\u1eebng b\u01b0\u1edbc", placeholder: "C\u00e1c b\u01b0\u1edbc s\u1ebd hi\u1ec7n \u1edf \u0111\u00e2y sau l\u1ea7n t\u00ednh \u0111\u1ea7u ti\u00ean." },
      history: { tag: "L\u1ecbch s\u1eed", title: "C\u00e1c ph\u00e9p t\u00ednh \u0111\u00e3 l\u01b0u", clearAll: "X\u00f3a t\u1ea5t c\u1ea3", edit: "S\u1eeda", delete: "X\u00f3a" },
      modal: { tag: "C\u1eadp nh\u1eadt", title: "S\u1eeda ph\u00e9p t\u00ednh \u0111\u00e3 l\u01b0u", cancel: "H\u1ee7y", update: "C\u1eadp nh\u1eadt b\u1ea3n ghi", close: "\u0110\u00f3ng" }
    }
  });

  Object.assign(EXTRA_COPY, {
    ko: {
      pageTitle: "\uae30\ub85d \uad00\ub9ac\uac00 \uc788\ub294 \ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998 \uc2dc\uc2a4\ud15c",
      metaDescription: "\uc800\uc7a5 \uae30\ub85d, \uc218\uc815, \uc5c5\ub370\uc774\ud2b8, \uc0ad\uc81c \uae30\ub2a5\uc774 \uc788\ub294 \ubc18\uc751\ud615 \ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998 \uacc4\uc0b0\uae30\uc785\ub2c8\ub2e4.",
      heroKicker: "\uc0c1\ud638\uc791\uc6a9 \uc218\ud559 \uc2dc\uc2a4\ud15c",
      heroTitle: "\uae30\ub85d \uad00\ub9ac\uac00 \uc788\ub294 \ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998 \uc2dc\uc2a4\ud15c",
      heroCopy: "\uc5ec\uae30\uc11c \uc2dc\uc791\ud558\uace0, \ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998 \uc124\uba85\uacfc \ud504\ub85c\ud544\uc744 \uba3c\uc800 \ud655\uc778\ud55c \ub4a4 \uc2dc\uc2a4\ud15c\uc73c\ub85c \ub4e4\uc5b4\uac00\uc138\uc694.",
      getStarted: "\uc2dc\uc791\ud558\uae30",
      languageLabel: "\uc5b8\uc5b4",
      heroChips: ["\uc989\uc2dc \uacb0\uacfc", "\uba85\ud655\ud55c \ub2e8\uacc4", "\uc800\uc7a5\ub41c \uae30\ub85d", "\uc560\ub2c8\uba54\uc774\uc158 \ud504\ub85c\ud544"],
      coreAlgorithmLabel: "\ud575\uc2ec \uacf5\uc2dd",
      coreAlgorithmNote: "\ub098\ub217\uc148\uc744 \ub354 \ubcf4\uae30 \uc27d\uace0 \uc815\ub9ac\ub41c \ud615\ud0dc\ub85c \ubcf5\uc2b5\ud560 \uc218 \uc788\uac8c \ud574 \uc8fc\ub294 \ud559\uc2b5 \ub3c4\uad6c\uc785\ub2c8\ub2e4.",
      intro: {
        tag: "\uac1c\uc694",
        title: "\ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998\uc774\ub780?",
        text: "\ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998\uc740 \ud55c \uc218\ub97c \ub2e4\ub978 \uc218\ub85c \ub098\ub20c \ub54c \ubaab\uacfc \ub098\uba38\uc9c0\uac00 \uc5b4\ub5bb\uac8c \uacb0\uc815\ub418\ub294\uc9c0 \uc124\uba85\ud569\ub2c8\ub2e4. \ub098\uba38\uc9c0\ub294 \ud56d\uc0c1 \uc81c\uc218\ubcf4\ub2e4 \uc791\uc544\uc57c \ud569\ub2c8\ub2e4.",
        points: [
          "\ud53c\uc81c\uc218\uac00 \uac19\uc740 \ud06c\uae30\uc758 \ubd80\ubd84\uc73c\ub85c \ub098\ub258\ub294 \ubc29\uc2dd\uc744 \ubcf4\uc5ec \uc90d\ub2c8\ub2e4.",
          "\ubaab\uacfc \ub098\uba38\uc9c0\ub97c \ud568\uaed8 \ubcf4\uc5ec \uc90d\ub2c8\ub2e4.",
          "\ub2f5\uc774 \ub9de\ub294\uc9c0 \ud655\uc778\ud558\ub294 \ub370 \ub3c4\uc6c0\uc744 \uc90d\ub2c8\ub2e4."
        ],
        viewTeam: "\ud504\ub85c\ud544 \ubcf4\uae30",
        coreIdeaLabel: "\ud575\uc2ec \uc544\uc774\ub514\uc5b4",
        coreIdeaNote: "\ub098\uba38\uc9c0\ub294 \ud56d\uc0c1 \uc81c\uc218\ubcf4\ub2e4 \uc791\uc544\uc57c \ud569\ub2c8\ub2e4."
      },
      team: {
        tag: "\ud504\ub85c\ud544",
        title: "\uad50\uc218\uc640 \ud300\uc6d0",
        hint: "\uce74\ub4dc\ub97c \ud074\ub9ad\ud558\uba74 \uc0c1\uc138 \uc815\ubcf4\uac00 \uc2ac\ub77c\uc774\ub4dc\ub429\ub2c8\ub2e4",
        professor: { label: "\uad50\uc218", note: "\ud504\ub85c\uc81d\ud2b8 \ub2f4\ub2f9 \uad50\uc218", roleValue: "\uad50\uc218" },
        members: {
          antonio: { label: "\ud504\ub85c\uc81d\ud2b8 \ud300\uc6d0", note: "\ud074\ub9ad\ud558\uc5ec \ud504\ub85c\ud544 \ubcf4\uae30", roleValue: "\ud504\ub85c\uc81d\ud2b8 \ud300\uc6d0" },
          ronald: { label: "\ud504\ub85c\uc81d\ud2b8 \ud300\uc6d0", note: "\ud074\ub9ad\ud558\uc5ec \ud504\ub85c\ud544 \ubcf4\uae30", roleValue: "\ud504\ub85c\uc81d\ud2b8 \ud300\uc6d0" },
          jaynielle: { label: "\ud504\ub85c\uc81d\ud2b8 \ud300\uc6d0", note: "\ud074\ub9ad\ud558\uc5ec \ud504\ub85c\ud544 \ubcf4\uae30", roleValue: "\ud504\ub85c\uc81d\ud2b8 \ud300\uc6d0" },
          comia: { label: "\ud504\ub85c\uc81d\ud2b8 \ud300\uc6d0", note: "\ud074\ub9ad\ud558\uc5ec \ud504\ub85c\ud544 \ubcf4\uae30", roleValue: "\ud504\ub85c\uc81d\ud2b8 \ud300\uc6d0" }
        }
      },
      calculator: {
        tag: "\uacc4\uc0b0\uae30",
        title: "\ub098\ub217\uc148 \ubb38\uc81c \ud480\uae30",
        dividendLabel: "\ud53c\uc81c\uc218 (a)",
        dividendPlaceholder: "\ud53c\uc81c\uc218 \uc785\ub825",
        dividendHint: "\uc5b4\ub5a4 \uc815\uc218\ub3c4 \uac00\ub2a5\ud569\ub2c8\ub2e4.",
        divisorLabel: "\uc81c\uc218 (b)",
        divisorPlaceholder: "\uc591\uc758 \uc81c\uc218 \uc785\ub825",
        divisorHint: "\uc81c\uc218\ub294 \uc591\uc758 \uc815\uc218\uc5ec\uc57c \ud569\ub2c8\ub2e4.",
        compute: "\uacc4\uc0b0 \ubc0f \uc800\uc7a5",
        clear: "\uc9c0\uc6b0\uae30",
        helperTitle: "\uc5ec\uae30\uc11c \uc77c\uc5b4\ub098\ub294 \uc77c",
        helperItems: [
          "\uc785\ub825\uc744 \uac80\uc99d\ud558\uace0 0\uc73c\ub85c \ub098\ub204\ub294 \uac83\uc744 \ub9c9\uc2b5\ub2c8\ub2e4.",
          "\ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998\uc73c\ub85c \ubaab\uacfc \ub098\uba38\uc9c0\ub97c \uacc4\uc0b0\ud569\ub2c8\ub2e4.",
          "\uac01 \uacc4\uc0b0\uc744 \uc800\uc7a5\ud558\uc5ec \ub098\uc911\uc5d0 \ub2e4\uc2dc \ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4."
        ]
      },
      result: {
        tag: "\uacb0\uacfc",
        title: "\uc989\uc2dc \ud574\uacb0",
        storagePill: "\uc800\uc7a5\ub41c \uae30\ub85d",
        readyBadge: "\uc900\ube44 \uc644\ub8cc",
        emptyTitle: "\uc544\uc9c1 \uacc4\uc0b0\ub41c \uac83\uc774 \uc5c6\uc2b5\ub2c8\ub2e4",
        emptyCopy: "\ud53c\uc81c\uc218\uc640 \uc81c\uc218\ub97c \uc785\ub825\ud55c \ub4a4 '\uacc4\uc0b0 \ubc0f \uc800\uc7a5'\uc744 \ub204\ub974\uba74 \ubaab, \ub098\uba38\uc9c0, \uac80\uc0b0 \ub2e8\uacc4\uac00 \ubcf4\uc785\ub2c8\ub2e4.",
        dividend: "\ud53c\uc81c\uc218",
        divisor: "\uc81c\uc218",
        verification: "\uac80\uc99d",
        quotient: "\ubaab (q)",
        remainder: "\ub098\uba38\uc9c0 (r)",
        formulaTitle: "\ud480\uc774 \uc2dd",
        explanationTitle: "\uc124\uba85",
        methodsTitle: "\ub2e4\ub978 \ubc29\ubc95",
        methodsPlaceholder: "\uacc4\uc0b0 \ud6c4 \ub2e4\ub978 \ud480\uc774 \ubc29\ubc95\uc774 \uc5ec\uae30\uc5d0 \ud45c\uc2dc\ub429\ub2c8\ub2e4.",
        valid: "\uc720\ud6a8",
        check: "\ud655\uc778 \ud544\uc694",
        reconstructedLabel: "\uc7ac\uad6c\uc131",
        checkNote: "\ub0b4\ub9bc \ub098\ub217\uc148\uc73c\ub85c \uacc4\uc0b0\ud558\uace0 \ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998\uc73c\ub85c \uac80\uc99d\ud588\uc2b5\ub2c8\ub2e4. \uc7ac\uad6c\uc131\ub41c \uac12: {value}."
      },
      steps: { tag: "\uacfc\uc815", title: "\ub2e8\uacc4\ubcc4 \ud480\uc774", hint: "fade\uc640 slide \ud6a8\uacfc\uac00 \ud480\uc774 \uacfc\uc815\uc744 \uc548\ub0b4\ud569\ub2c8\ub2e4", placeholder: "\uccab \uacc4\uc0b0 \ud6c4 \ub2e8\uacc4\uac00 \uc5ec\uae30\uc5d0 \ud45c\uc2dc\ub429\ub2c8\ub2e4." },
      history: {
        tag: "\uae30\ub85d",
        title: "\uc800\uc7a5\ub41c \uacc4\uc0b0",
        note: "\uc800\uc7a5\ub41c \uacc4\uc0b0\uc744 \uc0dd\uc131, \uc870\ud68c, \uc218\uc815, \uc0ad\uc81c\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
        clearAll: "\ubaa8\ub450 \uc9c0\uc6b0\uae30",
        count: function (count) { return count === 1 ? "\uae30\ub85d 1\uac1c" : `\uae30\ub85d ${count}\uac1c`; },
        headers: ["#", "\ud53c\uc81c\uc218", "\uc81c\uc218", "\ubaab", "\ub098\uba38\uc9c0", "\uc800\uc7a5 / \uc5c5\ub370\uc774\ud2b8", "\uc791\uc5c5"],
        empty: "\uc544\uc9c1 \uae30\ub85d\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \uc800\uc7a5\ud55c \uacc4\uc0b0\uc774 \uc5ec\uae30\uc5d0 \ubcf4\uc785\ub2c8\ub2e4.",
        edit: "\uc218\uc815",
        delete: "\uc0ad\uc81c"
      },
      modal: {
        tag: "\uc5c5\ub370\uc774\ud2b8",
        title: "\uc800\uc7a5\ub41c \uacc4\uc0b0 \uc218\uc815",
        dividendLabel: "\ud53c\uc81c\uc218 (a)",
        divisorLabel: "\uc81c\uc218 (b)",
        note: "\uae30\ub85d\uc744 \uc5c5\ub370\uc774\ud2b8\ud558\uba74 \ubaab\uacfc \ub098\uba38\uc9c0\uac00 \uc790\ub3d9\uc73c\ub85c \ub2e4\uc2dc \uacc4\uc0b0\ub429\ub2c8\ub2e4.",
        cancel: "\ucde8\uc18c",
        update: "\uae30\ub85d \uc5c5\ub370\uc774\ud2b8",
        close: "\ub2eb\uae30"
      }
    },
    ar: {
      pageTitle: "\u0646\u0638\u0627\u0645 \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0627\u0644\u0642\u0633\u0645\u0629 \u0645\u0639 \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0633\u062c\u0644",
      metaDescription: "\u062d\u0627\u0633\u0628\u0629 \u062a\u0641\u0627\u0639\u0644\u064a\u0629 \u0644\u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0627\u0644\u0642\u0633\u0645\u0629 \u0645\u0639 \u062d\u0641\u0638 \u0627\u0644\u0633\u062c\u0644 \u0648\u062a\u0639\u062f\u064a\u0644\u0647 \u0648\u062a\u062d\u062f\u064a\u062b\u0647 \u0648\u062d\u0630\u0641\u0647.",
      heroKicker: "\u0646\u0638\u0627\u0645 \u0631\u064a\u0627\u0636\u064a \u062a\u0641\u0627\u0639\u0644\u064a",
      heroTitle: "\u0646\u0638\u0627\u0645 \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0627\u0644\u0642\u0633\u0645\u0629 \u0645\u0639 \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0633\u062c\u0644",
      heroCopy: "\u0627\u0628\u062f\u0623 \u0645\u0646 \u0647\u0646\u0627\u060c \u062b\u0645 \u0627\u0637\u0644\u0639 \u0639\u0644\u0649 \u0634\u0631\u062d \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0627\u0644\u0642\u0633\u0645\u0629 \u0648\u0627\u0644\u0645\u0644\u0641\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0642\u0628\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0646\u0638\u0627\u0645.",
      getStarted: "\u0627\u0628\u062f\u0623",
      languageLabel: "\u0627\u0644\u0644\u063a\u0629",
      heroChips: ["\u0646\u062a\u0627\u0626\u062c \u0641\u0648\u0631\u064a\u0629", "\u062e\u0637\u0648\u0627\u062a \u0648\u0627\u0636\u062d\u0629", "\u0633\u062c\u0644 \u0645\u062d\u0641\u0648\u0638", "\u0645\u0644\u0641\u0627\u062a \u0645\u062a\u062d\u0631\u0643\u0629"],
      coreAlgorithmLabel: "\u0627\u0644\u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629",
      coreAlgorithmNote: "\u0623\u062f\u0627\u0629 \u062a\u0639\u0644\u0645 \u062a\u062c\u0639\u0644 \u0627\u0644\u0642\u0633\u0645\u0629 \u0623\u0648\u0636\u062d \u0648\u0623\u0643\u062b\u0631 \u062a\u0646\u0638\u064a\u0645\u0627\u064b \u0648\u0623\u0633\u0647\u0644 \u0644\u0644\u0645\u0631\u0627\u062c\u0639\u0629.",
      intro: {
        tag: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629",
        title: "\u0645\u0627 \u0647\u064a \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0627\u0644\u0642\u0633\u0645\u0629\u061f",
        text: "\u062a\u0648\u0636\u062d \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0627\u0644\u0642\u0633\u0645\u0629 \u0643\u064a\u0641 \u064a\u0645\u0643\u0646 \u0642\u0633\u0645\u0629 \u0639\u062f\u062f \u0639\u0644\u0649 \u0639\u062f\u062f \u0622\u062e\u0631 \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0646\u0627\u062a\u062c \u0642\u0633\u0645\u0629 \u0648\u0628\u0627\u0642\u064a. \u0648\u0627\u0644\u0628\u0627\u0642\u064a \u064a\u062c\u0628 \u0623\u0646 \u064a\u0643\u0648\u0646 \u0623\u0635\u063a\u0631 \u062f\u0627\u0626\u0645\u0627\u064b \u0645\u0646 \u0627\u0644\u0645\u0642\u0633\u0648\u0645 \u0639\u0644\u064a\u0647.",
        points: [
          "\u062a\u0638\u0647\u0631 \u0643\u064a\u0641 \u064a\u062a\u0645 \u062a\u0642\u0633\u064a\u0645 \u0627\u0644\u0645\u0642\u0633\u0648\u0645 \u0625\u0644\u0649 \u0623\u062c\u0632\u0627\u0621 \u0645\u062a\u0633\u0627\u0648\u064a\u0629.",
          "\u062a\u0639\u0637\u064a \u0646\u0627\u062a\u062c \u0627\u0644\u0642\u0633\u0645\u0629 \u0648\u0627\u0644\u0628\u0627\u0642\u064a.",
          "\u062a\u0633\u0627\u0639\u062f \u0641\u064a \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0635\u062d\u0629 \u0627\u0644\u0625\u062c\u0627\u0628\u0629."
        ],
        viewTeam: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0644\u0641\u0627\u062a",
        coreIdeaLabel: "\u0627\u0644\u0641\u0643\u0631\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629",
        coreIdeaNote: "\u064a\u062c\u0628 \u0623\u0646 \u064a\u0628\u0642\u0649 \u0627\u0644\u0628\u0627\u0642\u064a \u0623\u0635\u063a\u0631 \u0645\u0646 \u0627\u0644\u0645\u0642\u0633\u0648\u0645 \u0639\u0644\u064a\u0647."
      },
      result: {
        tag: "\u0627\u0644\u0646\u062a\u0627\u0626\u062c",
        title: "\u062d\u0644 \u0641\u0648\u0631\u064a",
        storagePill: "\u0633\u062c\u0644 \u0645\u062d\u0641\u0648\u0638",
        readyBadge: "\u062c\u0627\u0647\u0632",
        emptyTitle: "\u0644\u0627 \u064a\u0648\u062c\u062f \u062d\u0633\u0627\u0628 \u0628\u0639\u062f",
        emptyCopy: "\u0623\u062f\u062e\u0644 \u0627\u0644\u0645\u0642\u0633\u0648\u0645 \u0648\u0627\u0644\u0645\u0642\u0633\u0648\u0645 \u0639\u0644\u064a\u0647\u060c \u062b\u0645 \u0627\u0636\u063a\u0637 \u0639\u0644\u0649 '\u0627\u062d\u0633\u0628 \u0648\u0627\u062d\u0641\u0638' \u0644\u0645\u0634\u0627\u0647\u062f\u0629 \u0646\u0627\u062a\u062c \u0627\u0644\u0642\u0633\u0645\u0629 \u0648\u0627\u0644\u0628\u0627\u0642\u064a \u0648\u062e\u0637\u0648\u0627\u062a \u0627\u0644\u062a\u062d\u0642\u0642.",
        dividend: "\u0627\u0644\u0645\u0642\u0633\u0648\u0645",
        divisor: "\u0627\u0644\u0645\u0642\u0633\u0648\u0645 \u0639\u0644\u064a\u0647",
        verification: "\u0627\u0644\u062a\u062d\u0642\u0642",
        quotient: "\u0646\u0627\u062a\u062c \u0627\u0644\u0642\u0633\u0645\u0629 (q)",
        remainder: "\u0627\u0644\u0628\u0627\u0642\u064a (r)",
        formulaTitle: "\u0627\u0644\u0645\u0639\u0627\u062f\u0644\u0629 \u0627\u0644\u0645\u062d\u0644\u0648\u0644\u0629",
        explanationTitle: "\u0627\u0644\u0634\u0631\u062d",
        methodsTitle: "\u0637\u0631\u0642 \u0623\u062e\u0631\u0649"
      }
    },
    hi: {
      pageTitle: "\u0939\u093f\u0938\u094d\u091f\u094d\u0930\u0940 \u092e\u0948\u0928\u0947\u091c\u092e\u0947\u0902\u091f \u0915\u0947 \u0938\u093e\u0925 Division Algorithm System",
      metaDescription: "\u090f\u0915 responsive division algorithm calculator \u091c\u093f\u0938\u092e\u0947\u0902 \u0938\u0947\u0935 \u0939\u093f\u0938\u094d\u091f\u094d\u0930\u0940, edit, update \u0914\u0930 delete \u0938\u0941\u0935\u093f\u0927\u093e\u090f\u0901 \u0939\u0948\u0902.",
      heroKicker: "\u0907\u0902\u091f\u0930\u090f\u0915\u094d\u091f\u093f\u0935 \u092e\u0948\u0925 \u0938\u093f\u0938\u094d\u091f\u092e",
      heroTitle: "\u0939\u093f\u0938\u094d\u091f\u094d\u0930\u0940 \u092e\u0948\u0928\u0947\u091c\u092e\u0947\u0902\u091f \u0915\u0947 \u0938\u093e\u0925 Division Algorithm System",
      heroCopy: "\u092f\u0939\u093e\u0901 \u0938\u0947 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902, \u092b\u093f\u0930 Division Algorithm \u0915\u093e explanation \u0926\u0947\u0916\u0947\u0902 \u0914\u0930 profiles \u0915\u094b explore \u0915\u0930\u0947\u0902.",
      getStarted: "\u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
      languageLabel: "\u092d\u093e\u0937\u093e",
      heroChips: ["\u0924\u0941\u0930\u0902\u0924 result", "\u0938\u093e\u092b steps", "\u0938\u0947\u0935 history", "animated profiles"],
      coreAlgorithmLabel: "\u092e\u0941\u0916\u094d\u092f \u0938\u0942\u0924\u094d\u0930",
      coreAlgorithmNote: "\u090f\u0915 learning tool \u091c\u094b division \u0915\u094b \u0926\u0943\u0936\u094d\u092f, \u0935\u094d\u092f\u0935\u0938\u094d\u0925\u093f\u0924 \u0914\u0930 review \u0915\u0947 \u0932\u093f\u090f \u0906\u0938\u093e\u0928 \u092c\u0928\u093e\u0924\u093e \u0939\u0948.",
      result: {
        tag: "\u092a\u0930\u093f\u0923\u093e\u092e",
        title: "\u0924\u0941\u0930\u0902\u0924 \u0938\u092e\u093e\u0927\u093e\u0928",
        storagePill: "\u0938\u0947\u0935 history",
        readyBadge: "\u0924\u0948\u092f\u093e\u0930",
        emptyTitle: "\u0905\u092d\u0940 \u0924\u0915 \u0915\u094b\u0908 computation \u0928\u0939\u0940\u0902",
        emptyCopy: "\u092d\u093e\u091c\u094d\u092f \u0914\u0930 \u092d\u093e\u091c\u0915 \u0921\u093e\u0932\u0947\u0902, \u092b\u093f\u0930 'Compute & Save' \u0926\u092c\u093e\u090f\u0901 \u0924\u093e\u0915\u093f quotient, remainder \u0914\u0930 verification steps \u0926\u093f\u0916\u0947\u0902.",
        dividend: "\u092d\u093e\u091c\u094d\u092f",
        divisor: "\u092d\u093e\u091c\u0915",
        verification: "\u091c\u093e\u0901\u091a",
        quotient: "Quotient (q)",
        remainder: "Remainder (r)",
        formulaTitle: "\u0939\u0932 \u0915\u0940 \u0917\u0908 equation",
        explanationTitle: "\u0935\u094d\u092f\u093e\u0916\u094d\u092f\u093e",
        methodsTitle: "\u0905\u0928\u094d\u092f \u0935\u093f\u0927\u093f\u092f\u093e\u0901"
      }
    },
    pt: {
      pageTitle: "Sistema do Algoritmo da Divis\u00e3o com Gerenciamento de Hist\u00f3rico",
      metaDescription: "Uma calculadora responsiva do algoritmo da divis\u00e3o com hist\u00f3rico salvo, edi\u00e7\u00e3o, atualiza\u00e7\u00e3o e exclus\u00e3o.",
      heroKicker: "Sistema matemático interativo",
      heroTitle: "Sistema do Algoritmo da Divis\u00e3o com Gerenciamento de Hist\u00f3rico",
      heroCopy: "Comece aqui, veja a explica\u00e7\u00e3o do algoritmo da divis\u00e3o e explore os perfis antes de entrar mais fundo no sistema.",
      getStarted: "Come\u00e7ar",
      languageLabel: "Idioma",
      heroChips: ["Resultados instant\u00e2neos", "Passos claros", "Hist\u00f3rico salvo", "Perfis animados"],
      coreAlgorithmLabel: "Algoritmo principal",
      coreAlgorithmNote: "Uma ferramenta de aprendizagem para tornar a divis\u00e3o vis\u00edvel, organizada e f\u00e1cil de revisar depois.",
      result: {
        tag: "Resultados",
        title: "Solu\u00e7\u00e3o instant\u00e2nea",
        storagePill: "Hist\u00f3rico salvo",
        readyBadge: "Pronto",
        emptyTitle: "Ainda n\u00e3o h\u00e1 c\u00e1lculo",
        emptyCopy: "Digite o dividendo e o divisor, depois clique em 'Calcular e salvar' para ver o quociente, o resto e as etapas de verifica\u00e7\u00e3o.",
        dividend: "Dividendo",
        divisor: "Divisor",
        verification: "Verifica\u00e7\u00e3o",
        quotient: "Quociente (q)",
        remainder: "Resto (r)",
        formulaTitle: "Equa\u00e7\u00e3o resolvida",
        explanationTitle: "Explica\u00e7\u00e3o",
        methodsTitle: "Outros m\u00e9todos"
      }
    },
    de: {
      pageTitle: "Divisionsalgorithmus-System",
      metaDescription: "Ein responsiver Rechner f\u00fcr den Divisionsalgorithmus mit gespeichertem Verlauf, Bearbeiten, Aktualisieren und L\u00f6schen.",
      heroKicker: "Interaktives Mathematiksystem",
      heroTitle: "Divisionsalgorithmus-System",
      heroCopy: "Beginne hier, sieh dir die Erkl\u00e4rung des Divisionsalgorithmus an und erkunde die Profile, bevor du tiefer in das System gehst.",
      getStarted: "Loslegen",
      languageLabel: "Sprache",
      heroChips: ["Sofortige Ergebnisse", "Klare Schritte", "Gespeicherter Verlauf", "Animierte Profile"],
      coreAlgorithmLabel: "Kernalgorithmus",
      coreAlgorithmNote: "Ein Lernwerkzeug, das Division sichtbar, geordnet und sp\u00e4ter leicht nachvollziehbar macht.",
      result: {
        tag: "Ergebnisse",
        title: "Sofortige L\u00f6sung",
        storagePill: "Gespeicherter Verlauf",
        readyBadge: "Bereit",
        emptyTitle: "Noch keine Berechnung",
        emptyCopy: "Gib Dividend und Divisor ein und klicke dann auf 'Berechnen & speichern', um Quotient, Rest und Pr\u00fcfschritte zu sehen.",
        dividend: "Dividend",
        divisor: "Divisor",
        verification: "Pr\u00fcfung",
        quotient: "Quotient (q)",
        remainder: "Rest (r)",
        formulaTitle: "Gel\u00f6ste Gleichung",
        explanationTitle: "Erkl\u00e4rung",
        methodsTitle: "Weitere Methoden"
      }
    },
    id: {
      pageTitle: "Sistem Algoritma Pembagian",
      metaDescription: "Kalkulator algoritma pembagian yang responsif dengan riwayat tersimpan, edit, update, dan hapus.",
      heroKicker: "Sistem matematika interaktif",
      heroTitle: "Sistem Algoritma Pembagian",
      heroCopy: "Mulai dari sini, lalu lihat penjelasan algoritma pembagian dan profil anggota sebelum masuk lebih jauh ke sistem.",
      getStarted: "Mulai",
      languageLabel: "Bahasa",
      heroChips: ["Hasil instan", "Langkah jelas", "Riwayat tersimpan", "Profil animasi"],
      coreAlgorithmLabel: "Algoritma inti",
      coreAlgorithmNote: "Alat belajar yang membuat pembagian lebih terlihat, lebih rapi, dan lebih mudah ditinjau kembali.",
      result: {
        tag: "Hasil",
        title: "Solusi instan",
        storagePill: "Riwayat tersimpan",
        readyBadge: "Siap",
        emptyTitle: "Belum ada perhitungan",
        emptyCopy: "Masukkan dividend dan divisor, lalu tekan 'Hitung & Simpan' untuk melihat quotient, remainder, dan langkah verifikasi.",
        dividend: "Dividend",
        divisor: "Divisor",
        verification: "Verifikasi",
        quotient: "Quotient (q)",
        remainder: "Remainder (r)",
        formulaTitle: "Persamaan terselesaikan",
        explanationTitle: "Penjelasan",
        methodsTitle: "Metode lain"
      }
    },
    vi: {
      pageTitle: "H\u1ec7 th\u1ed1ng Thu\u1eadt to\u00e1n Chia c\u00f3 Qu\u1ea3n l\u00fd L\u1ecbch s\u1eed",
      metaDescription: "M\u1ed9t b\u1ed9 t\u00ednh thu\u1eadt to\u00e1n chia responsive c\u00f3 l\u01b0u l\u1ecbch s\u1eed, ch\u1ec9nh s\u1eeda, c\u1eadp nh\u1eadt v\u00e0 x\u00f3a.",
      heroKicker: "H\u1ec7 th\u1ed1ng to\u00e1n h\u1ecdc t\u01b0\u01a1ng t\u00e1c",
      heroTitle: "H\u1ec7 th\u1ed1ng Thu\u1eadt to\u00e1n Chia c\u00f3 Qu\u1ea3n l\u00fd L\u1ecbch s\u1eed",
      heroCopy: "B\u1eaft \u0111\u1ea7u t\u1ea1i \u0111\u00e2y, sau \u0111\u00f3 xem gi\u1ea3i th\u00edch v\u1ec1 thu\u1eadt to\u00e1n chia v\u00e0 kh\u00e1m ph\u00e1 h\u1ed3 s\u01a1 tr\u01b0\u1edbc khi \u0111i s\u00e2u v\u00e0o h\u1ec7 th\u1ed1ng.",
      getStarted: "B\u1eaft \u0111\u1ea7u",
      languageLabel: "Ng\u00f4n ng\u1eef",
      heroChips: ["K\u1ebft qu\u1ea3 ngay l\u1eadp t\u1ee9c", "B\u01b0\u1edbc gi\u1ea3i r\u00f5 r\u00e0ng", "L\u1ecbch s\u1eed \u0111\u00e3 l\u01b0u", "H\u1ed3 s\u01a1 c\u00f3 hi\u1ec7u \u1ee9ng"],
      coreAlgorithmLabel: "Thu\u1eadt to\u00e1n c\u1ed1t l\u00f5i",
      coreAlgorithmNote: "M\u1ed9t c\u00f4ng c\u1ee5 h\u1ecdc t\u1eadp gi\u00fap ph\u00e9p chia d\u1ec5 nh\u00ecn, c\u00f3 t\u1ed5 ch\u1ee9c v\u00e0 d\u1ec5 xem l\u1ea1i sau.",
      result: {
        tag: "K\u1ebft qu\u1ea3",
        title: "L\u1eddi gi\u1ea3i ngay l\u1eadp t\u1ee9c",
        storagePill: "L\u1ecbch s\u1eed \u0111\u00e3 l\u01b0u",
        readyBadge: "S\u1eb5n s\u00e0ng",
        emptyTitle: "Ch\u01b0a c\u00f3 ph\u00e9p t\u00ednh n\u00e0o",
        emptyCopy: "Nh\u1eadp s\u1ed1 b\u1ecb chia v\u00e0 s\u1ed1 chia, sau \u0111\u00f3 nh\u1ea5n 'T\u00ednh v\u00e0 l\u01b0u' \u0111\u1ec3 xem quotient, remainder v\u00e0 c\u00e1c b\u01b0\u1edbc ki\u1ec3m tra.",
        dividend: "S\u1ed1 b\u1ecb chia",
        divisor: "S\u1ed1 chia",
        verification: "Ki\u1ec3m tra",
        quotient: "Th\u01b0\u01a1ng (q)",
        remainder: "S\u1ed1 d\u01b0 (r)",
        formulaTitle: "Ph\u01b0\u01a1ng tr\u00ecnh \u0111\u00e3 gi\u1ea3i",
        explanationTitle: "Gi\u1ea3i th\u00edch",
        methodsTitle: "Ph\u01b0\u01a1ng ph\u00e1p kh\u00e1c"
      }
    }
  });

  // Clean override layer for multilingual labels and packs.
  Object.assign(LANGUAGE_NAMES, {
    es: "Espa\u00f1ol",
    fr: "Fran\u00e7ais",
    zh: "\u4e2d\u6587",
    ja: "\u65e5\u672c\u8a9e",
    ko: "\ud55c\uad6d\uc5b4",
    ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
    hi: "\u0939\u093f\u0928\u094d\u0926\u0940",
    pt: "Portugu\u00eas",
    vi: "Ti\u1ebfng Vi\u1ec7t"
  });

  Object.assign(PROFILE_FIELD_LABELS, {
    fr: { name: "Nom", role: "R\u00f4le" },
    zh: { name: "\u59d3\u540d", role: "\u89d2\u8272" },
    ja: { name: "\u540d\u524d", role: "\u5f79\u5272" },
    ko: { name: "\uc774\ub984", role: "\uc5ed\ud560" },
    ar: { name: "\u0627\u0644\u0627\u0633\u0645", role: "\u0627\u0644\u062f\u0648\u0631" },
    hi: { name: "\u0928\u093e\u092e", role: "\u092d\u0942\u092e\u093f\u0915\u093e" },
    pt: { name: "Nome", role: "Fun\u00e7\u00e3o" },
    vi: { name: "T\u00ean", role: "Vai tr\u00f2" }
  });

  Object.assign(EXPLANATION_HEADINGS, {
    es: { formal: "Regla formal", why: "Por qu\u00e9 funciona", step: "Pensamiento paso a paso", conclusion: "Conclusi\u00f3n" },
    fr: { formal: "R\u00e8gle formelle", why: "Pourquoi cela fonctionne", step: "Raisonnement \u00e9tape par \u00e9tape", conclusion: "Conclusion" },
    zh: { formal: "\u6b63\u5f0f\u89c4\u5219", why: "\u4e3a\u4ec0\u4e48\u6210\u7acb", step: "\u9010\u6b65\u601d\u8003", conclusion: "\u7ed3\u8bba" },
    ja: { formal: "\u6b63\u5f0f\u306a\u898f\u5247", why: "\u306a\u305c\u6210\u308a\u7acb\u3064\u304b", step: "\u6bb5\u968e\u7684\u306a\u8003\u3048\u65b9", conclusion: "\u7d50\u8ad6" },
    ko: { formal: "\uc815\uc2dd \uaddc\uce59", why: "\uc65c \uc131\ub9bd\ud558\ub294\uac00", step: "\ub2e8\uacc4\ubcc4 \uc0dd\uac01", conclusion: "\uacb0\ub860" },
    ar: { formal: "\u0627\u0644\u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0631\u0633\u0645\u064a\u0629", why: "\u0644\u0645\u0627\u0630\u0627 \u064a\u0639\u0645\u0644", step: "\u0627\u0644\u062a\u0641\u0643\u064a\u0631 \u062e\u0637\u0648\u0629 \u0628\u062e\u0637\u0648\u0629", conclusion: "\u0627\u0644\u062e\u0644\u0627\u0635\u0629" },
    hi: { formal: "\u0914\u092a\u091a\u093e\u0930\u093f\u0915 \u0928\u093f\u092f\u092e", why: "\u092f\u0939 \u0915\u094d\u092f\u094b\u0902 \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0939\u0948", step: "\u091a\u0930\u0923-\u0926\u0930-\u091a\u0930\u0923 \u0938\u094b\u091a", conclusion: "\u0928\u093f\u0937\u094d\u0915\u0930\u094d\u0937" },
    pt: { formal: "Regra formal", why: "Por que funciona", step: "Pensamento passo a passo", conclusion: "Conclus\u00e3o" },
    de: { formal: "Formale Regel", why: "Warum es funktioniert", step: "Schritt-f\u00fcr-Schritt-Denken", conclusion: "Fazit" },
    id: { formal: "Aturan formal", why: "Mengapa ini berhasil", step: "Pemikiran langkah demi langkah", conclusion: "Kesimpulan" },
    vi: { formal: "Quy t\u1eafc ch\u00ednh th\u1ee9c", why: "V\u00ec sao c\u00e1ch n\u00e0y \u0111\u00fang", step: "Suy ngh\u0129 t\u1eebng b\u01b0\u1edbc", conclusion: "K\u1ebft lu\u1eadn" }
  });

  Object.assign(STEP_TEMPLATES, {
    es: [
      "Comienza con el dividendo a = {dividend} y el divisor b = {divisor}.",
      "Aplica la divisi\u00f3n por piso: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Calcula el resto con r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Comprueba el algoritmo de la divisi\u00f3n: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Verifica el l\u00edmite: 0 <= {remainder} < {divisor}."
    ],
    fr: [
      "Commence avec le dividende a = {dividend} et le diviseur b = {divisor}.",
      "Applique la division par plancher : q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Calcule le reste avec r = a - bq : r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "V\u00e9rifie l'algorithme de la division : {dividend} = {divisor} * {quotient} + {remainder}.",
      "V\u00e9rifie la borne : 0 <= {remainder} < {divisor}."
    ],
    zh: [
      "\u4ece\u88ab\u9664\u6570 a = {dividend} \u548c\u9664\u6570 b = {divisor} \u5f00\u59cb\u3002",
      "\u4f7f\u7528\u5411\u4e0b\u53d6\u6574\u9664\u6cd5\uff1aq = floor(a / b) = floor({dividend} / {divisor}) = {quotient}\u3002",
      "\u7528 r = a - bq \u8ba1\u7b97\u4f59\u6570\uff1ar = {dividend} - ({divisor} * {quotient}) = {remainder}\u3002",
      "\u68c0\u67e5\u9664\u6cd5\u7b97\u6cd5\uff1a{dividend} = {divisor} * {quotient} + {remainder}\u3002",
      "\u9a8c\u8bc1\u8303\u56f4\uff1a0 <= {remainder} < {divisor}\u3002"
    ],
    ja: [
      "\u88ab\u9664\u6570 a = {dividend} \u3068\u9664\u6570 b = {divisor} \u304b\u3089\u59cb\u3081\u307e\u3059\u3002",
      "\u5e8a\u95a2\u6570\u306b\u3088\u308b\u9664\u7b97\u3092\u4f7f\u3044\u307e\u3059: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}\u3002",
      "r = a - bq \u3067\u4f59\u308a\u3092\u6c42\u3081\u307e\u3059: r = {dividend} - ({divisor} * {quotient}) = {remainder}\u3002",
      "\u5272\u308a\u7b97\u306e\u6cd5\u5247\u3092\u78ba\u8a8d\u3057\u307e\u3059: {dividend} = {divisor} * {quotient} + {remainder}\u3002",
      "\u7bc4\u56f2\u3092\u78ba\u8a8d\u3057\u307e\u3059: 0 <= {remainder} < {divisor}\u3002"
    ],
    ko: [
      "\ud53c\uc81c\uc218 a = {dividend}\uc640 \uc81c\uc218 b = {divisor}\ubd80\ud130 \uc2dc\uc791\ud569\ub2c8\ub2e4.",
      "\ub0b4\ub9bc \ub098\ub217\uc148\uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "r = a - bq\ub85c \ub098\uba38\uc9c0\ub97c \uad6c\ud569\ub2c8\ub2e4: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "\ub098\ub217\uc148 \uc54c\uace0\ub9ac\uc998\uc744 \ud655\uc778\ud569\ub2c8\ub2e4: {dividend} = {divisor} * {quotient} + {remainder}.",
      "\ubc94\uc704\ub97c \ud655\uc778\ud569\ub2c8\ub2e4: 0 <= {remainder} < {divisor}."
    ],
    ar: [
      "\u0627\u0628\u062f\u0623 \u0628\u0627\u0644\u0645\u0642\u0633\u0648\u0645 a = {dividend} \u0648\u0627\u0644\u0645\u0642\u0633\u0648\u0645 \u0639\u0644\u064a\u0647 b = {divisor}.",
      "\u0627\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u0642\u0633\u0645\u0629 \u0645\u0639 \u0627\u0644\u062a\u0642\u0631\u064a\u0628 \u0644\u0644\u0623\u0633\u0641\u0644: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "\u0627\u062d\u0633\u0628 \u0627\u0644\u0628\u0627\u0642\u064a \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "\u062a\u062d\u0642\u0642 \u0645\u0646 \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0627\u0644\u0642\u0633\u0645\u0629: {dividend} = {divisor} * {quotient} + {remainder}.",
      "\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0634\u0631\u0637: 0 <= {remainder} < {divisor}."
    ],
    hi: [
      "\u092d\u093e\u091c\u094d\u092f a = {dividend} \u0914\u0930 \u092d\u093e\u091c\u0915 b = {divisor} \u0938\u0947 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902\u0964",
      "floor division \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0947\u0902: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "r = a - bq \u0938\u0947 \u0936\u0947\u0937 \u0928\u093f\u0915\u093e\u0932\u0947\u0902: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Division Algorithm \u091c\u093e\u0901\u091a\u0947\u0902: {dividend} = {divisor} * {quotient} + {remainder}.",
      "\u0938\u0940\u092e\u093e \u091c\u093e\u0901\u091a\u0947\u0902: 0 <= {remainder} < {divisor}."
    ],
    pt: [
      "Comece com o dividendo a = {dividend} e o divisor b = {divisor}.",
      "Use a divis\u00e3o por piso: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Calcule o resto com r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Verifique o algoritmo da divis\u00e3o: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Confira o limite: 0 <= {remainder} < {divisor}."
    ],
    de: [
      "Beginne mit dem Dividend a = {dividend} und dem Divisor b = {divisor}.",
      "Verwende die Abrundungsdivision: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Berechne den Rest mit r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Pr\u00fcfe den Divisionsalgorithmus: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Pr\u00fcfe die Grenze: 0 <= {remainder} < {divisor}."
    ],
    id: [
      "Mulai dengan dividend a = {dividend} dan divisor b = {divisor}.",
      "Gunakan pembagian lantai: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "Hitung sisa dengan r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Periksa algoritma pembagian: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Periksa batasnya: 0 <= {remainder} < {divisor}."
    ],
    vi: [
      "B\u1eaft \u0111\u1ea7u v\u1edbi s\u1ed1 b\u1ecb chia a = {dividend} v\u00e0 s\u1ed1 chia b = {divisor}.",
      "D\u00f9ng ph\u00e9p chia l\u1ea5y s\u00e0n: q = floor(a / b) = floor({dividend} / {divisor}) = {quotient}.",
      "T\u00ednh s\u1ed1 d\u01b0 b\u1eb1ng r = a - bq: r = {dividend} - ({divisor} * {quotient}) = {remainder}.",
      "Ki\u1ec3m tra thu\u1eadt to\u00e1n chia: {dividend} = {divisor} * {quotient} + {remainder}.",
      "Ki\u1ec3m tra gi\u1edbi h\u1ea1n: 0 <= {remainder} < {divisor}."
    ]
  });

  Object.assign(EXTRA_COPY, {
    es: {
      pageTitle: "Sistema del algoritmo de divisi\u00f3n con gesti\u00f3n de historial",
      metaDescription: "Una calculadora responsiva del algoritmo de divisi\u00f3n con historial guardado, edici\u00f3n, actualizaci\u00f3n y eliminaci\u00f3n.",
      heroKicker: "Sistema matemático interactivo",
      heroTitle: "Sistema del algoritmo de divisi\u00f3n con gesti\u00f3n de historial",
      heroCopy: "Empieza aqu\u00ed, luego mira la explicaci\u00f3n del algoritmo de divisi\u00f3n y explora los perfiles antes de entrar al sistema.",
      getStarted: "Empezar",
      languageLabel: "Idioma",
      heroChips: ["Resultados instant\u00e1neos", "Pasos claros", "Historial guardado", "Perfiles animados"],
      coreAlgorithmLabel: "Algoritmo principal",
      coreAlgorithmNote: "Una herramienta de aprendizaje para hacer visible la divisi\u00f3n, mantenerla organizada y revisarla despu\u00e9s.",
      intro: {
        tag: "Resumen",
        title: "\u00bfQu\u00e9 es el algoritmo de divisi\u00f3n?",
        text: "El algoritmo de divisi\u00f3n explica c\u00f3mo un n\u00famero se divide entre otro obteniendo un cociente y un resto. Garantiza que el resto siempre sea menor que el divisor.",
        points: [
          "Muestra c\u00f3mo el dividendo se separa en partes iguales.",
          "Da el cociente y el resto.",
          "Ayuda a comprobar si la respuesta es correcta."
        ],
        viewTeam: "Ver perfiles",
        coreIdeaLabel: "Idea principal",
        coreIdeaNote: "El resto siempre debe ser menor que el divisor."
      },
      team: {
        tag: "Perfiles",
        title: "Profesora y miembros",
        hint: "Haz clic en una tarjeta para deslizar los detalles",
        professor: { label: "Profesora", note: "Profesora del proyecto y gu\u00eda de presentaci\u00f3n", roleValue: "Profesora" },
        members: {
          antonio: { label: "Miembro del proyecto", note: "Haz clic para ver el perfil", roleValue: "Miembro del proyecto" },
          ronald: { label: "Miembro del proyecto", note: "Haz clic para ver el perfil", roleValue: "Miembro del proyecto" },
          jaynielle: { label: "Miembro del proyecto", note: "Haz clic para ver el perfil", roleValue: "Miembro del proyecto" },
          comia: { label: "Miembro del proyecto", note: "Haz clic para ver el perfil", roleValue: "Miembro del proyecto" }
        }
      },
      calculator: {
        tag: "Calculadora",
        title: "Resolver un problema de divisi\u00f3n",
        dividendLabel: "Dividendo (a)",
        dividendPlaceholder: "Ingresa el dividendo",
        dividendHint: "Se permite cualquier n\u00famero entero.",
        divisorLabel: "Divisor (b)",
        divisorPlaceholder: "Ingresa un divisor positivo",
        divisorHint: "El divisor debe ser un entero positivo.",
        compute: "Calcular y guardar",
        clear: "Limpiar",
        helperTitle: "Qu\u00e9 ocurre aqu\u00ed",
        helperItems: [
          "Valida los datos y bloquea la divisi\u00f3n entre cero.",
          "Calcula cociente y resto usando el algoritmo de divisi\u00f3n.",
          "Guarda cada c\u00e1lculo para revisarlo despu\u00e9s."
        ]
      },
      result: {
        tag: "Resultados",
        title: "Soluci\u00f3n instant\u00e1nea",
        storagePill: "Historial guardado",
        readyBadge: "Listo",
        emptyTitle: "Todav\u00eda no hay c\u00e1lculo",
        emptyCopy: "Ingresa un dividendo y un divisor, luego presiona Calcular y guardar para ver el cociente, el resto y los pasos de verificaci\u00f3n.",
        dividend: "Dividendo",
        divisor: "Divisor",
        verification: "Verificaci\u00f3n",
        quotient: "Cociente (q)",
        remainder: "Resto (r)",
        formulaTitle: "Ecuaci\u00f3n resuelta",
        explanationTitle: "Explicaci\u00f3n",
        methodsTitle: "Otros m\u00e9todos",
        methodsPlaceholder: "Aqu\u00ed aparecer\u00e1n otros m\u00e9todos de soluci\u00f3n despu\u00e9s del c\u00e1lculo.",
        valid: "V\u00e1lido",
        check: "Revisar",
        reconstructedLabel: "Reconstruido",
        checkNote: "Calculado con divisi\u00f3n por piso y verificado con el algoritmo de divisi\u00f3n. Valor reconstruido: {value}."
      },
      steps: { tag: "Proceso", title: "Soluci\u00f3n paso a paso", hint: "Las transiciones fade y slide gu\u00edan la soluci\u00f3n", placeholder: "Los pasos aparecer\u00e1n aqu\u00ed despu\u00e9s del primer c\u00e1lculo." },
      history: {
        tag: "Historial",
        title: "C\u00e1lculos guardados",
        note: "Crear, leer, actualizar y eliminar c\u00e1lculos guardados.",
        clearAll: "Borrar todo",
        count: function (count) { return count === 1 ? "1 registro" : `${count} registros`; },
        headers: ["#", "Dividendo", "Divisor", "Cociente", "Resto", "Guardado / actualizado", "Acciones"],
        empty: "Todav\u00eda no hay registros. Los c\u00e1lculos guardados aparecer\u00e1n aqu\u00ed.",
        edit: "Editar",
        delete: "Eliminar"
      },
      modal: {
        tag: "Actualizar",
        title: "Editar c\u00e1lculo guardado",
        dividendLabel: "Dividendo (a)",
        divisorLabel: "Divisor (b)",
        note: "Al actualizar un registro, el sistema recalcula autom\u00e1ticamente el cociente y el resto.",
        cancel: "Cancelar",
        update: "Actualizar registro",
        close: "Cerrar"
      },
      messages: {
        invalidNumbers: "Ingresa n\u00fameros enteros para el dividendo y el divisor.",
        invalidDivisor: "El divisor debe ser un entero positivo mayor que cero.",
        saveStorage: "No se puede guardar el registro. Permite el almacenamiento del navegador y vuelve a intentarlo.",
        saveSuccess: "El c\u00e1lculo se guard\u00f3 en el historial.",
        updateStorage: "No se puede guardar el registro. Permite el almacenamiento del navegador y vuelve a intentarlo.",
        updateSuccess: "El registro se actualiz\u00f3 correctamente.",
        missingRecord: "No se encontr\u00f3 el registro seleccionado.",
        missingHistory: "Este registro ya no existe en el historial.",
        deleteStorage: "No se pudo actualizar el historial guardado. Se cancel\u00f3 la eliminaci\u00f3n.",
        deleteSuccess: "El registro se elimin\u00f3 del historial.",
        noRecords: "No hay registros para borrar.",
        clearConfirm: "\u00bfBorrar todos los c\u00e1lculos guardados del historial?",
        clearStorage: "No se pudo borrar el historial guardado. No se elimin\u00f3 nada.",
        clearSuccess: "Se borraron todos los registros del historial.",
        deleteConfirm: function (record) { return `\u00bfEliminar este c\u00e1lculo?\n\nDividendo: ${record.dividend}\nDivisor: ${record.divisor}`; }
      },
      explanation: {
        formalRuleGeneral: "Para cualquier entero a y entero positivo b, existen enteros \u00fanicos q y r tales que a = bq + r y 0 <= r < b.",
        formalRuleNegative: "La formulaci\u00f3n formal del algoritmo de divisi\u00f3n exige que el divisor b sea positivo (b > 0). Aunque el dividendo a sea negativo, el resto debe cumplir 0 <= r < b.",
        whyGeneral: "Como el dividendo no es negativo, la divisi\u00f3n por piso mantiene el cociente como el mayor entero que no supera a / b y el resto queda en el rango correcto.",
        whyNegative: "Como el dividendo es negativo, el cociente tambi\u00e9n es negativo. Para conservar un resto v\u00e1lido, el sistema usa divisi\u00f3n por piso, que elige el mayor entero menor o igual que a / b.",
        stepGeneral1: "Usa divisi\u00f3n por piso: q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepGeneral2: "Multiplica el divisor por el cociente: {b} * {q} = {multiple}.",
        stepGeneral3: "Resta para obtener el resto: {a} - ({multiple}) = {r}.",
        stepNegative1: "Primero encuentra el cociente: q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepNegative2: "Usa ese cociente para obtener el m\u00faltiplo inferior m\u00e1s cercano del divisor: {b} * ({q}) = {multiple}.",
        stepNegative3: "Resta el m\u00faltiplo del dividendo: {a} - ({multiple}) = {r}.",
        conclusionGeneral: "Respuesta final: {a} = {b}({q}) + {r}. La comprobaci\u00f3n da {reconstructed} y la regla del resto sigue siendo v\u00e1lida porque 0 <= {r} < {b}.",
        conclusionNegative: "Respuesta final: {a} = {b}({q}) + {r}. La comprobaci\u00f3n da {reconstructed} y la regla del resto sigue siendo v\u00e1lida porque 0 <= {r} < {b}."
      },
      methods: {
        floor: { title: "M\u00e9todo de divisi\u00f3n por piso", text: "Calcula q = floor(a / b) y luego usa r = a - bq. En este resultado, q = {q} y r = {r}." },
        lowerMultiple: { title: "M\u00e9todo del m\u00faltiplo inferior m\u00e1s cercano", text: "Busca el m\u00faltiplo de {b} m\u00e1s cercano a {a} sin pasarse. Aqu\u00ed, ese m\u00faltiplo es {multiple}, y el resto es {r}." },
        verify: { title: "M\u00e9todo de verificaci\u00f3n", text: "Comprueba la respuesta reconstruyendo el dividendo: {a} = {b}({q}) + {r}, y confirma que 0 <= {r} < {b}." }
      }
    },
    fr: {
      pageTitle: "Syst\u00e8me de l'algorithme de division",
      metaDescription: "Une calculatrice responsive de l'algorithme de division avec historique enregistr\u00e9, modification, mise \u00e0 jour et suppression.",
      heroKicker: "Syst\u00e8me mathématique interactif",
      heroTitle: "Syst\u00e8me de l'algorithme de division",
      heroCopy: "Commence ici, puis regarde l'explication de l'algorithme de division et les profils avant d'aller plus loin dans le syst\u00e8me.",
      getStarted: "Commencer",
      languageLabel: "Langue",
      heroChips: ["R\u00e9sultats instantan\u00e9s", "\u00c9tapes claires", "Historique enregistr\u00e9", "Profils anim\u00e9s"],
      coreAlgorithmLabel: "Algorithme principal",
      coreAlgorithmNote: "Un outil d'apprentissage pour rendre la division visible, organis\u00e9e et facile \u00e0 revoir plus tard.",
      intro: {
        tag: "Aper\u00e7u",
        title: "Qu'est-ce que l'algorithme de division ?",
        text: "L'algorithme de division explique comment un nombre est divis\u00e9 par un autre pour produire un quotient et un reste. Il garantit que le reste reste toujours plus petit que le diviseur.",
        points: [
          "Il montre comment le dividende est partag\u00e9 en parts \u00e9gales.",
          "Il donne le quotient et le reste.",
          "Il aide \u00e0 v\u00e9rifier si la r\u00e9ponse est correcte."
        ],
        viewTeam: "Voir les profils",
        coreIdeaLabel: "Id\u00e9e principale",
        coreIdeaNote: "Le reste doit toujours \u00eatre inf\u00e9rieur au diviseur."
      },
      team: {
        tag: "Profils",
        title: "Professeure et membres",
        hint: "Clique sur une carte pour faire glisser les d\u00e9tails",
        professor: { label: "Professeure", note: "Professeure du projet et guide de pr\u00e9sentation", roleValue: "Professeure" },
        members: {
          antonio: { label: "Membre du projet", note: "Clique pour voir le profil", roleValue: "Membre du projet" },
          ronald: { label: "Membre du projet", note: "Clique pour voir le profil", roleValue: "Membre du projet" },
          jaynielle: { label: "Membre du projet", note: "Clique pour voir le profil", roleValue: "Membre du projet" },
          comia: { label: "Membre du projet", note: "Clique pour voir le profil", roleValue: "Membre du projet" }
        }
      },
      calculator: {
        tag: "Calculatrice",
        title: "R\u00e9soudre un probl\u00e8me de division",
        dividendLabel: "Dividende (a)",
        dividendPlaceholder: "Saisir le dividende",
        dividendHint: "Tout entier est autoris\u00e9.",
        divisorLabel: "Diviseur (b)",
        divisorPlaceholder: "Saisir un diviseur positif",
        divisorHint: "Le diviseur doit \u00eatre un entier positif.",
        compute: "Calculer et enregistrer",
        clear: "Effacer",
        helperTitle: "Ce qui se passe ici",
        helperItems: [
          "Valide les entr\u00e9es et bloque la division par z\u00e9ro.",
          "Calcule le quotient et le reste avec l'algorithme de division.",
          "Enregistre chaque calcul pour le revoir plus tard."
        ]
      },
      result: {
        tag: "R\u00e9sultats",
        title: "Solution instantan\u00e9e",
        storagePill: "Historique enregistr\u00e9",
        readyBadge: "Pr\u00eat",
        emptyTitle: "Aucun calcul pour le moment",
        emptyCopy: "Saisis un dividende et un diviseur, puis appuie sur Calculer et enregistrer pour voir le quotient, le reste et les \u00e9tapes de v\u00e9rification.",
        dividend: "Dividende",
        divisor: "Diviseur",
        verification: "V\u00e9rification",
        quotient: "Quotient (q)",
        remainder: "Reste (r)",
        formulaTitle: "\u00c9quation r\u00e9solue",
        explanationTitle: "Explication",
        methodsTitle: "Autres m\u00e9thodes",
        methodsPlaceholder: "D'autres m\u00e9thodes de r\u00e9solution appara\u00eetront ici apr\u00e8s un calcul.",
        valid: "Valide",
        check: "V\u00e9rifier",
        reconstructedLabel: "Reconstruit",
        checkNote: "Calcul\u00e9 avec la division par plancher et v\u00e9rifi\u00e9 avec l'algorithme de division. Valeur reconstruite : {value}."
      },
      steps: { tag: "Processus", title: "Solution \u00e9tape par \u00e9tape", hint: "Les transitions fade et slide guident la solution", placeholder: "Les \u00e9tapes appara\u00eetront ici apr\u00e8s le premier calcul." },
      history: {
        tag: "Historique",
        title: "Calculs enregistr\u00e9s",
        note: "Cr\u00e9er, lire, mettre \u00e0 jour et supprimer les calculs enregistr\u00e9s.",
        clearAll: "Tout effacer",
        count: function (count) { return count === 1 ? "1 enregistrement" : `${count} enregistrements`; },
        headers: ["#", "Dividende", "Diviseur", "Quotient", "Reste", "Enregistr\u00e9 / mis \u00e0 jour", "Actions"],
        empty: "Aucun enregistrement pour le moment. Les calculs enregistr\u00e9s appara\u00eetront ici.",
        edit: "Modifier",
        delete: "Supprimer"
      },
      modal: {
        tag: "Mettre \u00e0 jour",
        title: "Modifier le calcul enregistr\u00e9",
        dividendLabel: "Dividende (a)",
        divisorLabel: "Diviseur (b)",
        note: "La mise \u00e0 jour d'un enregistrement recalcule automatiquement le quotient et le reste.",
        cancel: "Annuler",
        update: "Mettre \u00e0 jour",
        close: "Fermer"
      },
      messages: {
        invalidNumbers: "Saisis des nombres entiers pour le dividende et le diviseur.",
        invalidDivisor: "Le diviseur doit \u00eatre un entier positif sup\u00e9rieur \u00e0 z\u00e9ro.",
        saveStorage: "Impossible d'enregistrer le calcul. Autorise le stockage du navigateur et r\u00e9essaie.",
        saveSuccess: "Le calcul a \u00e9t\u00e9 enregistr\u00e9 dans l'historique.",
        updateStorage: "Impossible d'enregistrer le calcul. Autorise le stockage du navigateur et r\u00e9essaie.",
        updateSuccess: "L'enregistrement a \u00e9t\u00e9 mis \u00e0 jour avec succ\u00e8s.",
        missingRecord: "L'enregistrement s\u00e9lectionn\u00e9 est introuvable.",
        missingHistory: "Cet enregistrement n'existe plus dans l'historique.",
        deleteStorage: "Impossible de mettre \u00e0 jour l'historique enregistr\u00e9. La suppression a \u00e9t\u00e9 annul\u00e9e.",
        deleteSuccess: "L'enregistrement a \u00e9t\u00e9 supprim\u00e9 de l'historique.",
        noRecords: "Aucun enregistrement \u00e0 effacer.",
        clearConfirm: "Effacer tous les calculs enregistr\u00e9s de l'historique ?",
        clearStorage: "Impossible d'effacer l'historique enregistr\u00e9. Rien n'a \u00e9t\u00e9 supprim\u00e9.",
        clearSuccess: "Tous les enregistrements ont \u00e9t\u00e9 effac\u00e9s de l'historique.",
        deleteConfirm: function (record) { return `Supprimer ce calcul ?\n\nDividende : ${record.dividend}\nDiviseur : ${record.divisor}`; }
      },
      explanation: {
        formalRuleGeneral: "Pour tout entier a et tout entier positif b, il existe des entiers uniques q et r tels que a = bq + r et 0 <= r < b.",
        formalRuleNegative: "L'\u00e9nonc\u00e9 formel de l'algorithme de division exige que le diviseur b soit positif (b > 0). M\u00eame si le dividende a est n\u00e9gatif, le reste doit encore v\u00e9rifier 0 <= r < b.",
        whyGeneral: "Comme le dividende est non n\u00e9gatif, la division par plancher garde le quotient comme le plus grand entier ne d\u00e9passant pas a / b, tandis que le reste reste dans la bonne plage.",
        whyNegative: "Comme le dividende est n\u00e9gatif, le quotient devient aussi n\u00e9gatif. Pour garder un reste valide, le syst\u00e8me utilise la division par plancher, qui choisit le plus grand entier inf\u00e9rieur ou \u00e9gal \u00e0 a / b.",
        stepGeneral1: "Utilise la division par plancher : q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepGeneral2: "Multiplie le diviseur par le quotient : {b} * {q} = {multiple}.",
        stepGeneral3: "Soustrais pour obtenir le reste : {a} - ({multiple}) = {r}.",
        stepNegative1: "Trouve d'abord le quotient : q = floor(a / b) = floor({a} / {b}) = {q}.",
        stepNegative2: "Utilise ce quotient pour obtenir le multiple inf\u00e9rieur le plus proche du diviseur : {b} * ({q}) = {multiple}.",
        stepNegative3: "Soustrais ce multiple du dividende : {a} - ({multiple}) = {r}.",
        conclusionGeneral: "R\u00e9ponse finale : {a} = {b}({q}) + {r}. La v\u00e9rification donne {reconstructed} et la r\u00e8gle du reste reste valide car 0 <= {r} < {b}.",
        conclusionNegative: "R\u00e9ponse finale : {a} = {b}({q}) + {r}. La v\u00e9rification donne {reconstructed} et la r\u00e8gle du reste reste valide car 0 <= {r} < {b}."
      },
      methods: {
        floor: { title: "M\u00e9thode par division plancher", text: "Calcule q = floor(a / b), puis utilise r = a - bq. Pour ce r\u00e9sultat, q = {q} et r = {r}." },
        lowerMultiple: { title: "M\u00e9thode du multiple inf\u00e9rieur le plus proche", text: "Cherche le multiple de {b} le plus proche de {a} sans le d\u00e9passer. Ici, ce multiple est {multiple}, donc le reste est {r}." },
        verify: { title: "M\u00e9thode de v\u00e9rification", text: "V\u00e9rifie la r\u00e9ponse en reconstruisant le dividende : {a} = {b}({q}) + {r}, puis confirme que 0 <= {r} < {b}." }
      }
    },
    zh: {
      pageTitle: "\u5e26\u5386\u53f2\u7ba1\u7406\u7684\u9664\u6cd5\u7b97\u6cd5\u7cfb\u7edf",
      metaDescription: "\u4e00\u4e2a\u54cd\u5e94\u5f0f\u9664\u6cd5\u7b97\u6cd5\u8ba1\u7b97\u5668\uff0c\u5e26\u5df2\u4fdd\u5b58\u5386\u53f2\u3001\u7f16\u8f91\u3001\u66f4\u65b0\u548c\u5220\u9664\u529f\u80fd\u3002",
      heroKicker: "\u4e92\u52a8\u6570\u5b66\u7cfb\u7edf",
      heroTitle: "\u5e26\u5386\u53f2\u7ba1\u7406\u7684\u9664\u6cd5\u7b97\u6cd5\u7cfb\u7edf",
      heroCopy: "\u4ece\u8fd9\u91cc\u5f00\u59cb\uff0c\u5148\u67e5\u770b\u9664\u6cd5\u7b97\u6cd5\u7684\u89e3\u91ca\uff0c\u518d\u6d4f\u89c8\u7b80\u4ecb\uff0c\u7136\u540e\u6df1\u5165\u7cfb\u7edf\u3002",
      getStarted: "\u5f00\u59cb",
      languageLabel: "\u8bed\u8a00",
      heroChips: ["\u5373\u65f6\u7ed3\u679c", "\u6e05\u6670\u6b65\u9aa4", "\u5df2\u4fdd\u5b58\u5386\u53f2", "\u52a8\u753b\u7b80\u4ecb"],
      coreAlgorithmLabel: "\u6838\u5fc3\u516c\u5f0f",
      coreAlgorithmNote: "\u4e00\u4e2a\u8ba9\u9664\u6cd5\u66f4\u76f4\u89c2\u3001\u66f4\u6709\u6761\u7406\u3001\u66f4\u65b9\u4fbf\u590d\u4e60\u7684\u5b66\u4e60\u5de5\u5177\u3002",
      intro: {
        tag: "\u6982\u89c8",
        title: "\u4ec0\u4e48\u662f\u9664\u6cd5\u7b97\u6cd5\uff1f",
        text: "\u9664\u6cd5\u7b97\u6cd5\u89e3\u91ca\u4e00\u4e2a\u6570\u5982\u4f55\u88ab\u53e6\u4e00\u4e2a\u6570\u9664\uff0c\u4ece\u800c\u5f97\u5230\u5546\u548c\u4f59\u6570\u3002\u5b83\u4fdd\u8bc1\u4f59\u6570\u59cb\u7ec8\u5c0f\u4e8e\u9664\u6570\u3002",
        points: [
          "\u5b83\u5c55\u793a\u88ab\u9664\u6570\u5982\u4f55\u88ab\u5e73\u5206\u6210\u82e5\u5e72\u90e8\u5206\u3002",
          "\u5b83\u4f1a\u7ed9\u51fa\u5546\u548c\u4f59\u6570\u3002",
          "\u5b83\u53ef\u4ee5\u5e2e\u52a9\u9a8c\u8bc1\u7b54\u6848\u662f\u5426\u6b63\u786e\u3002"
        ],
        viewTeam: "\u67e5\u770b\u7b80\u4ecb",
        coreIdeaLabel: "\u6838\u5fc3\u601d\u60f3",
        coreIdeaNote: "\u4f59\u6570\u5fc5\u987b\u59cb\u7ec8\u5c0f\u4e8e\u9664\u6570\u3002"
      },
      team: {
        tag: "\u7b80\u4ecb",
        title: "\u6559\u6388\u4e0e\u6210\u5458",
        hint: "\u70b9\u51fb\u5361\u7247\u5373\u53ef\u5c55\u5f00\u8be6\u60c5",
        professor: { label: "\u6559\u6388", note: "\u9879\u76ee\u6559\u6388\u4e0e\u6f14\u793a\u6307\u5bfc", roleValue: "\u6559\u6388" },
        members: {
          antonio: { label: "\u9879\u76ee\u6210\u5458", note: "\u70b9\u51fb\u67e5\u770b\u7b80\u4ecb", roleValue: "\u9879\u76ee\u6210\u5458" },
          ronald: { label: "\u9879\u76ee\u6210\u5458", note: "\u70b9\u51fb\u67e5\u770b\u7b80\u4ecb", roleValue: "\u9879\u76ee\u6210\u5458" },
          jaynielle: { label: "\u9879\u76ee\u6210\u5458", note: "\u70b9\u51fb\u67e5\u770b\u7b80\u4ecb", roleValue: "\u9879\u76ee\u6210\u5458" },
          comia: { label: "\u9879\u76ee\u6210\u5458", note: "\u70b9\u51fb\u67e5\u770b\u7b80\u4ecb", roleValue: "\u9879\u76ee\u6210\u5458" }
        }
      },
      calculator: {
        tag: "\u8ba1\u7b97\u5668",
        title: "\u89e3\u51b3\u9664\u6cd5\u95ee\u9898",
        dividendLabel: "\u88ab\u9664\u6570 (a)",
        dividendPlaceholder: "\u8f93\u5165\u88ab\u9664\u6570",
        dividendHint: "\u5141\u8bb8\u4efb\u4f55\u6574\u6570\u3002",
        divisorLabel: "\u9664\u6570 (b)",
        divisorPlaceholder: "\u8f93\u5165\u6b63\u9664\u6570",
        divisorHint: "\u9664\u6570\u5fc5\u987b\u662f\u6b63\u6574\u6570\u3002",
        compute: "\u8ba1\u7b97\u5e76\u4fdd\u5b58",
        clear: "\u6e05\u7a7a",
        helperTitle: "\u8fd9\u91cc\u4f1a\u53d1\u751f\u4ec0\u4e48",
        helperItems: [
          "\u9a8c\u8bc1\u8f93\u5165\u5e76\u963b\u6b62\u9664\u4ee5\u96f6\u3002",
          "\u4f7f\u7528\u9664\u6cd5\u7b97\u6cd5\u8ba1\u7b97\u5546\u548c\u4f59\u6570\u3002",
          "\u4fdd\u5b58\u6bcf\u6b21\u8ba1\u7b97\uff0c\u65b9\u4fbf\u65e5\u540e\u67e5\u770b\u3002"
        ]
      },
      result: {
        tag: "\u7ed3\u679c",
        title: "\u5373\u65f6\u89e3\u7b54",
        storagePill: "\u5df2\u4fdd\u5b58\u5386\u53f2",
        readyBadge: "\u5c31\u7eea",
        emptyTitle: "\u8fd8\u6ca1\u6709\u8ba1\u7b97",
        emptyCopy: "\u8f93\u5165\u88ab\u9664\u6570\u548c\u9664\u6570\uff0c\u7136\u540e\u70b9\u51fb\u8ba1\u7b97\u5e76\u4fdd\u5b58\uff0c\u5373\u53ef\u67e5\u770b\u5546\u3001\u4f59\u6570\u548c\u9a8c\u8bc1\u6b65\u9aa4\u3002",
        dividend: "\u88ab\u9664\u6570",
        divisor: "\u9664\u6570",
        verification: "\u9a8c\u8bc1",
        quotient: "\u5546 (q)",
        remainder: "\u4f59\u6570 (r)",
        formulaTitle: "\u5df2\u89e3\u7b54\u7b49\u5f0f",
        explanationTitle: "\u89e3\u91ca",
        methodsTitle: "\u5176\u4ed6\u65b9\u6cd5",
        methodsPlaceholder: "\u5b8c\u6210\u8ba1\u7b97\u540e\uff0c\u5176\u4ed6\u89e3\u9898\u65b9\u6cd5\u4f1a\u663e\u793a\u5728\u8fd9\u91cc\u3002",
        valid: "\u6709\u6548",
        check: "\u68c0\u67e5",
        reconstructedLabel: "\u91cd\u5efa",
        checkNote: "\u4f7f\u7528\u5411\u4e0b\u53d6\u6574\u9664\u6cd5\u8ba1\u7b97\uff0c\u5e76\u7528\u9664\u6cd5\u7b97\u6cd5\u9a8c\u8bc1\u3002\u91cd\u5efa\u503c\uff1a{value}\u3002"
      },
      steps: { tag: "\u8fc7\u7a0b", title: "\u9010\u6b65\u89e3\u7b54", hint: "fade \u548c slide \u52a8\u753b\u4f1a\u5f15\u5bfc\u89e3\u9898\u8fc7\u7a0b", placeholder: "\u7b2c\u4e00\u6b21\u8ba1\u7b97\u540e\uff0c\u6b65\u9aa4\u4f1a\u663e\u793a\u5728\u8fd9\u91cc\u3002" },
      history: {
        tag: "\u5386\u53f2",
        title: "\u5df2\u4fdd\u5b58\u7684\u8ba1\u7b97",
        note: "\u521b\u5efa\u3001\u8bfb\u53d6\u3001\u66f4\u65b0\u548c\u5220\u9664\u5df2\u4fdd\u5b58\u7684\u8ba1\u7b97\u3002",
        clearAll: "\u5168\u90e8\u6e05\u9664",
        count: function (count) { return count === 1 ? "1 \u6761\u8bb0\u5f55" : `${count} \u6761\u8bb0\u5f55`; },
        headers: ["#", "\u88ab\u9664\u6570", "\u9664\u6570", "\u5546", "\u4f59\u6570", "\u4fdd\u5b58 / \u66f4\u65b0", "\u64cd\u4f5c"],
        empty: "\u6682\u65e0\u8bb0\u5f55\u3002\u4f60\u4fdd\u5b58\u7684\u8ba1\u7b97\u4f1a\u663e\u793a\u5728\u8fd9\u91cc\u3002",
        edit: "\u7f16\u8f91",
        delete: "\u5220\u9664"
      },
      modal: {
        tag: "\u66f4\u65b0",
        title: "\u7f16\u8f91\u5df2\u4fdd\u5b58\u7684\u8ba1\u7b97",
        dividendLabel: "\u88ab\u9664\u6570 (a)",
        divisorLabel: "\u9664\u6570 (b)",
        note: "\u66f4\u65b0\u8bb0\u5f55\u65f6\uff0c\u7cfb\u7edf\u4f1a\u81ea\u52a8\u91cd\u65b0\u8ba1\u7b97\u5546\u548c\u4f59\u6570\u3002",
        cancel: "\u53d6\u6d88",
        update: "\u66f4\u65b0\u8bb0\u5f55",
        close: "\u5173\u95ed"
      },
      messages: {
        invalidNumbers: "\u8bf7\u8f93\u5165\u88ab\u9664\u6570\u548c\u9664\u6570\u7684\u6574\u6570\u3002",
        invalidDivisor: "\u9664\u6570\u5fc5\u987b\u662f\u5927\u4e8e\u96f6\u7684\u6b63\u6574\u6570\u3002",
        saveStorage: "\u65e0\u6cd5\u4fdd\u5b58\u8bb0\u5f55\u3002\u8bf7\u5141\u8bb8\u6d4f\u89c8\u5668\u5b58\u50a8\u540e\u91cd\u8bd5\u3002",
        saveSuccess: "\u8ba1\u7b97\u5df2\u4fdd\u5b58\u5230\u5386\u53f2\u3002",
        updateStorage: "\u65e0\u6cd5\u4fdd\u5b58\u8bb0\u5f55\u3002\u8bf7\u5141\u8bb8\u6d4f\u89c8\u5668\u5b58\u50a8\u540e\u91cd\u8bd5\u3002",
        updateSuccess: "\u8bb0\u5f55\u5df2\u6210\u529f\u66f4\u65b0\u3002",
        missingRecord: "\u627e\u4e0d\u5230\u6240\u9009\u8bb0\u5f55\u3002",
        missingHistory: "\u6b64\u8bb0\u5f55\u5df2\u4e0d\u5728\u5386\u53f2\u4e2d\u3002",
        deleteStorage: "\u65e0\u6cd5\u66f4\u65b0\u5df2\u4fdd\u5b58\u7684\u5386\u53f2\u3002\u5220\u9664\u5df2\u53d6\u6d88\u3002",
        deleteSuccess: "\u8bb0\u5f55\u5df2\u4ece\u5386\u53f2\u4e2d\u5220\u9664\u3002",
        noRecords: "\u6ca1\u6709\u53ef\u6e05\u9664\u7684\u8bb0\u5f55\u3002",
        clearConfirm: "\u6e05\u9664\u5386\u53f2\u4e2d\u7684\u6240\u6709\u5df2\u4fdd\u5b58\u8ba1\u7b97\u5417\uff1f",
        clearStorage: "\u65e0\u6cd5\u6e05\u9664\u5df2\u4fdd\u5b58\u7684\u5386\u53f2\u3002\u6ca1\u6709\u5220\u9664\u4efb\u4f55\u5185\u5bb9\u3002",
        clearSuccess: "\u6240\u6709\u5386\u53f2\u8bb0\u5f55\u5df2\u88ab\u6e05\u9664\u3002",
        deleteConfirm: function (record) { return `\u5220\u9664\u6b64\u8ba1\u7b97\u5417\uff1f\n\n\u88ab\u9664\u6570: ${record.dividend}\n\u9664\u6570: ${record.divisor}`; }
      },
      explanation: {
        formalRuleGeneral: "\u5bf9\u4e8e\u4efb\u610f\u6574\u6570 a \u548c\u6b63\u6574\u6570 b\uff0c\u5b58\u5728\u552f\u4e00\u7684\u6574\u6570 q \u548c r\uff0c\u4f7f\u5f97 a = bq + r \u4e14 0 <= r < b\u3002",
        formalRuleNegative: "\u9664\u6cd5\u7b97\u6cd5\u7684\u6b63\u5f0f\u8868\u8ff0\u8981\u6c42\u9664\u6570 b \u5fc5\u987b\u4e3a\u6b63\u6570\uff08b > 0\uff09\u3002\u5373\u4f7f\u88ab\u9664\u6570 a \u4e3a\u8d1f\u6570\uff0c\u4f59\u6570\u4ecd\u5fc5\u987b\u6ee1\u8db3 0 <= r < b\u3002",
        whyGeneral: "\u7531\u4e8e\u88ab\u9664\u6570\u975e\u8d1f\uff0c\u5411\u4e0b\u53d6\u6574\u9664\u6cd5\u4f1a\u8ba9\u5546\u4fdd\u6301\u4e3a\u4e0d\u8d85\u8fc7 a / b \u7684\u6700\u5927\u6574\u6570\uff0c\u540c\u65f6\u4f59\u6570\u4ecd\u5728\u6b63\u786e\u8303\u56f4\u5185\u3002",
        whyNegative: "\u7531\u4e8e\u88ab\u9664\u6570\u4e3a\u8d1f\uff0c\u5546\u4e5f\u4f1a\u4e3a\u8d1f\u6570\u3002\u4e3a\u4e86\u4fdd\u6301\u4f59\u6570\u6709\u6548\uff0c\u7cfb\u7edf\u4f7f\u7528\u5411\u4e0b\u53d6\u6574\u9664\u6cd5\uff0c\u9009\u62e9\u5c0f\u4e8e\u6216\u7b49\u4e8e a / b \u7684\u6700\u5927\u6574\u6570\u3002",
        stepGeneral1: "\u4f7f\u7528\u5411\u4e0b\u53d6\u6574\u9664\u6cd5\uff1aq = floor(a / b) = floor({a} / {b}) = {q}\u3002",
        stepGeneral2: "\u7528\u9664\u6570\u4e58\u4ee5\u5546\uff1a{b} * {q} = {multiple}\u3002",
        stepGeneral3: "\u76f8\u51cf\u5f97\u5230\u4f59\u6570\uff1a{a} - ({multiple}) = {r}\u3002",
        stepNegative1: "\u5148\u6c42\u5546\uff1aq = floor(a / b) = floor({a} / {b}) = {q}\u3002",
        stepNegative2: "\u7528\u8fd9\u4e2a\u5546\u5f97\u5230\u6700\u63a5\u8fd1\u7684\u4e0b\u65b9\u500d\u6570\uff1a{b} * ({q}) = {multiple}\u3002",
        stepNegative3: "\u7528\u88ab\u9664\u6570\u51cf\u53bb\u8be5\u500d\u6570\uff1a{a} - ({multiple}) = {r}\u3002",
        conclusionGeneral: "\u6700\u7ec8\u7b54\u6848\uff1a{a} = {b}({q}) + {r}\u3002\u91cd\u5efa\u68c0\u67e5\u5f97\u5230 {reconstructed}\uff0c\u5e76\u4e14\u4f59\u6570\u89c4\u5219\u6210\u7acb\uff0c\u56e0\u4e3a 0 <= {r} < {b}\u3002",
        conclusionNegative: "\u6700\u7ec8\u7b54\u6848\uff1a{a} = {b}({q}) + {r}\u3002\u91cd\u5efa\u68c0\u67e5\u5f97\u5230 {reconstructed}\uff0c\u5e76\u4e14\u4f59\u6570\u89c4\u5219\u6210\u7acb\uff0c\u56e0\u4e3a 0 <= {r} < {b}\u3002"
      },
      methods: {
        floor: { title: "\u5411\u4e0b\u53d6\u6574\u9664\u6cd5", text: "\u5148\u8ba1\u7b97 q = floor(a / b)\uff0c\u518d\u4f7f\u7528 r = a - bq\u3002\u5bf9\u4e8e\u8fd9\u4e2a\u7ed3\u679c\uff0cq = {q}\uff0cr = {r}\u3002" },
        lowerMultiple: { title: "\u6700\u63a5\u8fd1\u7684\u4e0b\u65b9\u500d\u6570\u6cd5", text: "\u627e\u51fa\u4e0d\u8d85\u8fc7 {a} \u7684\u3001\u6700\u63a5\u8fd1\u7684 {b} \u7684\u500d\u6570\u3002\u8fd9\u91cc\u8fd9\u4e2a\u500d\u6570\u662f {multiple}\uff0c\u6240\u4ee5\u4f59\u6570\u662f {r}\u3002" },
        verify: { title: "\u9a8c\u8bc1\u65b9\u6cd5", text: "\u901a\u8fc7\u91cd\u65b0\u7ec4\u6210\u88ab\u9664\u6570\u6765\u68c0\u67e5\u7b54\u6848\uff1a{a} = {b}({q}) + {r}\uff0c\u518d\u786e\u8ba4 0 <= {r} < {b}\u3002" }
      }
    },
    ja: {
      pageTitle: "\u5c65\u6b74\u7ba1\u7406\u4ed8\u304d\u5272\u308a\u7b97\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u30b7\u30b9\u30c6\u30e0",
      metaDescription: "\u5c65\u6b74\u306e\u4fdd\u5b58\u3001\u7de8\u96c6\u3001\u66f4\u65b0\u3001\u524a\u9664\u304c\u3067\u304d\u308b\u3001\u30ec\u30b9\u30dd\u30f3\u30b7\u30d6\u306a\u5272\u308a\u7b97\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u96fb\u5353\u3067\u3059\u3002",
      heroKicker: "\u30a4\u30f3\u30bf\u30e9\u30af\u30c6\u30a3\u30d6\u6570\u5b66\u30b7\u30b9\u30c6\u30e0",
      heroTitle: "\u5c65\u6b74\u7ba1\u7406\u4ed8\u304d\u5272\u308a\u7b97\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u30b7\u30b9\u30c6\u30e0",
      heroCopy: "\u3053\u3053\u304b\u3089\u59cb\u3081\u3066\u3001\u5272\u308a\u7b97\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u306e\u8aac\u660e\u3092\u78ba\u8a8d\u3057\u3001\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u898b\u3066\u304b\u3089\u30b7\u30b9\u30c6\u30e0\u306b\u9032\u3093\u3067\u304f\u3060\u3055\u3044\u3002",
      getStarted: "\u958b\u59cb",
      languageLabel: "\u8a00\u8a9e",
      heroChips: ["\u5373\u6642\u7d50\u679c", "\u308f\u304b\u308a\u3084\u3059\u3044\u624b\u9806", "\u4fdd\u5b58\u3055\u308c\u305f\u5c65\u6b74", "\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u4ed8\u304d\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb"],
      coreAlgorithmLabel: "\u6838\u5fc3\u3068\u306a\u308b\u5f0f",
      coreAlgorithmNote: "\u5272\u308a\u7b97\u3092\u3088\u308a\u898b\u3084\u3059\u304f\u3001\u6574\u7406\u3057\u3066\u3001\u5f8c\u304b\u3089\u5fa9\u7fd2\u3057\u3084\u3059\u304f\u3059\u308b\u5b66\u7fd2\u30c4\u30fc\u30eb\u3067\u3059\u3002",
      intro: {
        tag: "\u6982\u8981",
        title: "\u5272\u308a\u7b97\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u3068\u306f\uff1f",
        text: "\u5272\u308a\u7b97\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u306f\u3001\u3042\u308b\u6570\u3092\u5225\u306e\u6570\u3067\u5272\u3063\u305f\u3068\u304d\u306b\u3001\u5546\u3068\u4f59\u308a\u304c\u3069\u306e\u3088\u3046\u306b\u6c42\u307e\u308b\u304b\u3092\u8aac\u660e\u3057\u307e\u3059\u3002\u4f59\u308a\u306f\u5e38\u306b\u9664\u6570\u3088\u308a\u5c0f\u3055\u304f\u306a\u308a\u307e\u3059\u3002",
        points: [
          "\u88ab\u9664\u6570\u304c\u3069\u306e\u3088\u3046\u306b\u7b49\u3057\u3044\u90e8\u5206\u306b\u5206\u3051\u3089\u308c\u308b\u304b\u3092\u793a\u3057\u307e\u3059\u3002",
          "\u5546\u3068\u4f59\u308a\u3092\u4e21\u65b9\u793a\u3057\u307e\u3059\u3002",
          "\u7b54\u3048\u304c\u6b63\u3057\u3044\u304b\u3092\u78ba\u304b\u3081\u308b\u306e\u306b\u5f79\u7acb\u3061\u307e\u3059\u3002"
        ],
        viewTeam: "\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u898b\u308b",
        coreIdeaLabel: "\u57fa\u672c\u306e\u8003\u3048\u65b9",
        coreIdeaNote: "\u4f59\u308a\u306f\u5e38\u306b\u9664\u6570\u3088\u308a\u5c0f\u3055\u304f\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093\u3002"
      },
      team: {
        tag: "\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb",
        title: "\u5148\u751f\u3068\u30e1\u30f3\u30d0\u30fc",
        hint: "\u30ab\u30fc\u30c9\u3092\u30af\u30ea\u30c3\u30af\u3059\u308b\u3068\u8a73\u7d30\u304c\u30b9\u30e9\u30a4\u30c9\u8868\u793a\u3055\u308c\u307e\u3059",
        professor: { label: "\u5148\u751f", note: "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u62c5\u5f53\u6559\u54e1", roleValue: "\u5148\u751f" },
        members: {
          antonio: { label: "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30e1\u30f3\u30d0\u30fc", note: "\u30af\u30ea\u30c3\u30af\u3057\u3066\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u8868\u793a", roleValue: "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30e1\u30f3\u30d0\u30fc" },
          ronald: { label: "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30e1\u30f3\u30d0\u30fc", note: "\u30af\u30ea\u30c3\u30af\u3057\u3066\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u8868\u793a", roleValue: "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30e1\u30f3\u30d0\u30fc" },
          jaynielle: { label: "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30e1\u30f3\u30d0\u30fc", note: "\u30af\u30ea\u30c3\u30af\u3057\u3066\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u8868\u793a", roleValue: "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30e1\u30f3\u30d0\u30fc" },
          comia: { label: "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30e1\u30f3\u30d0\u30fc", note: "\u30af\u30ea\u30c3\u30af\u3057\u3066\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u8868\u793a", roleValue: "\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30e1\u30f3\u30d0\u30fc" }
        }
      },
      calculator: {
        tag: "\u8a08\u7b97\u6a5f",
        title: "\u5272\u308a\u7b97\u554f\u984c\u3092\u89e3\u304f",
        dividendLabel: "\u88ab\u9664\u6570 (a)",
        dividendPlaceholder: "\u88ab\u9664\u6570\u3092\u5165\u529b",
        dividendHint: "\u4efb\u610f\u306e\u6574\u6570\u3092\u5165\u529b\u3067\u304d\u307e\u3059\u3002",
        divisorLabel: "\u9664\u6570 (b)",
        divisorPlaceholder: "\u6b63\u306e\u9664\u6570\u3092\u5165\u529b",
        divisorHint: "\u9664\u6570\u306f\u6b63\u306e\u6574\u6570\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002",
        compute: "\u8a08\u7b97\u3057\u3066\u4fdd\u5b58",
        clear: "\u30af\u30ea\u30a2",
        helperTitle: "\u3053\u3053\u3067\u884c\u3046\u3053\u3068",
        helperItems: [
          "\u5165\u529b\u3092\u78ba\u8a8d\u3057\u30010 \u3067\u5272\u308b\u306e\u3092\u9632\u304e\u307e\u3059\u3002",
          "\u5272\u308a\u7b97\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u3092\u4f7f\u3063\u3066\u5546\u3068\u4f59\u308a\u3092\u8a08\u7b97\u3057\u307e\u3059\u3002",
          "\u5404\u8a08\u7b97\u3092\u4fdd\u5b58\u3057\u3066\u5f8c\u3067\u78ba\u8a8d\u3067\u304d\u307e\u3059\u3002"
        ]
      },
      result: {
        tag: "\u7d50\u679c",
        title: "\u5373\u6642\u89e3\u7b54",
        storagePill: "\u4fdd\u5b58\u3055\u308c\u305f\u5c65\u6b74",
        readyBadge: "\u6e96\u5099\u5b8c\u4e86",
        emptyTitle: "\u307e\u3060\u8a08\u7b97\u3055\u308c\u3066\u3044\u307e\u305b\u3093",
        emptyCopy: "\u88ab\u9664\u6570\u3068\u9664\u6570\u3092\u5165\u529b\u3057\u300c\u8a08\u7b97\u3057\u3066\u4fdd\u5b58\u300d\u3092\u62bc\u3059\u3068\u3001\u5546\u3001\u4f59\u308a\u3001\u78ba\u8a8d\u624b\u9806\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002",
        dividend: "\u88ab\u9664\u6570",
        divisor: "\u9664\u6570",
        verification: "\u78ba\u8a8d",
        quotient: "\u5546 (q)",
        remainder: "\u4f59\u308a (r)",
        formulaTitle: "\u6c42\u3081\u305f\u5f0f",
        explanationTitle: "\u8aac\u660e",
        methodsTitle: "\u5225\u306e\u65b9\u6cd5",
        methodsPlaceholder: "\u8a08\u7b97\u5f8c\u306b\u5225\u306e\u89e3\u304d\u65b9\u304c\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002",
        valid: "\u6709\u52b9",
        check: "\u78ba\u8a8d\u304c\u5fc5\u8981",
        reconstructedLabel: "\u518d\u69cb\u6210",
        checkNote: "\u5e8a\u95a2\u6570\u306b\u3088\u308b\u9664\u7b97\u3067\u8a08\u7b97\u3057\u3001\u5272\u308a\u7b97\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u3067\u78ba\u8a8d\u3057\u307e\u3057\u305f\u3002\u518d\u69cb\u6210\u3057\u305f\u5024: {value}\u3002"
      },
      steps: { tag: "\u624b\u9806", title: "\u30b9\u30c6\u30c3\u30d7\u3054\u3068\u306e\u89e3\u6cd5", hint: "fade \u3068 slide \u306e\u52d5\u304d\u3067\u89e3\u304d\u65b9\u3092\u5c0e\u304d\u307e\u3059", placeholder: "\u6700\u521d\u306e\u8a08\u7b97\u5f8c\u306b\u624b\u9806\u304c\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002" },
      history: {
        tag: "\u5c65\u6b74",
        title: "\u4fdd\u5b58\u3055\u308c\u305f\u8a08\u7b97",
        note: "\u4fdd\u5b58\u3057\u305f\u8a08\u7b97\u3092\u4f5c\u6210\u3001\u8868\u793a\u3001\u66f4\u65b0\u3001\u524a\u9664\u3067\u304d\u307e\u3059\u3002",
        clearAll: "\u3059\u3079\u3066\u6d88\u53bb",
        count: function (count) { return count === 1 ? "1 \u4ef6\u306e\u8a18\u9332" : `${count} \u4ef6\u306e\u8a18\u9332`; },
        headers: ["#", "\u88ab\u9664\u6570", "\u9664\u6570", "\u5546", "\u4f59\u308a", "\u4fdd\u5b58 / \u66f4\u65b0", "\u64cd\u4f5c"],
        empty: "\u307e\u3060\u8a18\u9332\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u4fdd\u5b58\u3057\u305f\u8a08\u7b97\u304c\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002",
        edit: "\u7de8\u96c6",
        delete: "\u524a\u9664"
      },
      modal: {
        tag: "\u66f4\u65b0",
        title: "\u4fdd\u5b58\u3057\u305f\u8a08\u7b97\u3092\u7de8\u96c6",
        dividendLabel: "\u88ab\u9664\u6570 (a)",
        divisorLabel: "\u9664\u6570 (b)",
        note: "\u8a18\u9332\u3092\u66f4\u65b0\u3059\u308b\u3068\u3001\u5546\u3068\u4f59\u308a\u304c\u81ea\u52d5\u3067\u518d\u8a08\u7b97\u3055\u308c\u307e\u3059\u3002",
        cancel: "\u30ad\u30e3\u30f3\u30bb\u30eb",
        update: "\u8a18\u9332\u3092\u66f4\u65b0",
        close: "\u9589\u3058\u308b"
      },
      messages: {
        invalidNumbers: "\u88ab\u9664\u6570\u3068\u9664\u6570\u306b\u306f\u6574\u6570\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
        invalidDivisor: "\u9664\u6570\u306f 0 \u3088\u308a\u5927\u304d\u3044\u6b63\u306e\u6574\u6570\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002",
        saveStorage: "\u8a18\u9332\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3002\u30d6\u30e9\u30a6\u30b6\u306e\u30b9\u30c8\u30ec\u30fc\u30b8\u3092\u8a31\u53ef\u3057\u3066\u518d\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002",
        saveSuccess: "\u8a08\u7b97\u3092\u5c65\u6b74\u306b\u4fdd\u5b58\u3057\u307e\u3057\u305f\u3002",
        updateStorage: "\u8a18\u9332\u3092\u4fdd\u5b58\u3067\u304d\u307e\u305b\u3093\u3002\u30d6\u30e9\u30a6\u30b6\u306e\u30b9\u30c8\u30ec\u30fc\u30b8\u3092\u8a31\u53ef\u3057\u3066\u518d\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002",
        updateSuccess: "\u8a18\u9332\u3092\u66f4\u65b0\u3057\u307e\u3057\u305f\u3002",
        missingRecord: "\u9078\u629e\u3057\u305f\u8a18\u9332\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002",
        missingHistory: "\u3053\u306e\u8a18\u9332\u306f\u5c65\u6b74\u306b\u3042\u308a\u307e\u305b\u3093\u3002",
        deleteStorage: "\u4fdd\u5b58\u6e08\u307f\u306e\u5c65\u6b74\u3092\u66f4\u65b0\u3067\u304d\u306a\u304b\u3063\u305f\u305f\u3081\u3001\u524a\u9664\u306f\u30ad\u30e3\u30f3\u30bb\u30eb\u3055\u308c\u307e\u3057\u305f\u3002",
        deleteSuccess: "\u8a18\u9332\u3092\u5c65\u6b74\u304b\u3089\u524a\u9664\u3057\u307e\u3057\u305f\u3002",
        noRecords: "\u6d88\u53bb\u3067\u304d\u308b\u8a18\u9332\u304c\u3042\u308a\u307e\u305b\u3093\u3002",
        clearConfirm: "\u5c65\u6b74\u304b\u3089\u3059\u3079\u3066\u306e\u4fdd\u5b58\u6e08\u307f\u8a08\u7b97\u3092\u6d88\u53bb\u3057\u307e\u3059\u304b\uff1f",
        clearStorage: "\u4fdd\u5b58\u6e08\u307f\u306e\u5c65\u6b74\u3092\u6d88\u53bb\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u4f55\u3082\u524a\u9664\u3055\u308c\u307e\u305b\u3093\u3002",
        clearSuccess: "\u3059\u3079\u3066\u306e\u5c65\u6b74\u8a18\u9332\u3092\u6d88\u53bb\u3057\u307e\u3057\u305f\u3002",
        deleteConfirm: function (record) { return `\u3053\u306e\u8a08\u7b97\u3092\u524a\u9664\u3057\u307e\u3059\u304b\uff1f\n\n\u88ab\u9664\u6570: ${record.dividend}\n\u9664\u6570: ${record.divisor}`; }
      },
      explanation: {
        formalRuleGeneral: "\u4efb\u610f\u306e\u6574\u6570 a \u3068\u6b63\u306e\u6574\u6570 b \u306b\u5bfe\u3057\u3066\u3001a = bq + r \u304a\u3088\u3073 0 <= r < b \u3092\u6e80\u305f\u3059\u4e00\u610f\u306a\u6574\u6570 q \u3068 r \u304c\u5b58\u5728\u3057\u307e\u3059\u3002",
        formalRuleNegative: "\u5272\u308a\u7b97\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u306e\u6b63\u5f0f\u306a\u8a18\u8ff0\u3067\u306f\u3001\u9664\u6570 b \u306f\u6b63\u3067\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093 (b > 0)\u3002\u88ab\u9664\u6570 a \u304c\u8ca0\u3067\u3082\u3001\u4f59\u308a\u306f 0 <= r < b \u3092\u6e80\u305f\u3059\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002",
        whyGeneral: "\u88ab\u9664\u6570\u304c\u975e\u8ca0\u306e\u3068\u304d\u306f\u3001\u5e8a\u95a2\u6570\u306b\u3088\u308b\u9664\u7b97\u3067 a / b \u3092\u8d85\u3048\u306a\u3044\u6700\u5927\u306e\u6574\u6570\u304c\u5546\u3068\u306a\u308a\u3001\u4f59\u308a\u3082\u6b63\u3057\u3044\u7bc4\u56f2\u306b\u53ce\u307e\u308a\u307e\u3059\u3002",
        whyNegative: "\u88ab\u9664\u6570\u304c\u8ca0\u306e\u3068\u304d\u306f\u5546\u3082\u8ca0\u306b\u306a\u308a\u307e\u3059\u3002\u4f59\u308a\u3092\u6709\u52b9\u306b\u4fdd\u3064\u305f\u3081\u306b\u3001\u30b7\u30b9\u30c6\u30e0\u306f a / b \u4ee5\u4e0b\u306e\u6700\u5927\u306e\u6574\u6570\u3092\u9078\u3076\u5e8a\u95a2\u6570\u9664\u7b97\u3092\u4f7f\u3044\u307e\u3059\u3002",
        stepGeneral1: "\u5e8a\u95a2\u6570\u9664\u7b97\u3092\u4f7f\u3044\u307e\u3059: q = floor(a / b) = floor({a} / {b}) = {q}\u3002",
        stepGeneral2: "\u9664\u6570\u3068\u5546\u3092\u639b\u3051\u307e\u3059: {b} * {q} = {multiple}\u3002",
        stepGeneral3: "\u5f15\u304d\u7b97\u3057\u3066\u4f59\u308a\u3092\u6c42\u3081\u307e\u3059: {a} - ({multiple}) = {r}\u3002",
        stepNegative1: "\u307e\u305a\u5546\u3092\u6c42\u3081\u307e\u3059: q = floor(a / b) = floor({a} / {b}) = {q}\u3002",
        stepNegative2: "\u305d\u306e\u5546\u3092\u4f7f\u3063\u3066\u3001\u9664\u6570\u306e\u6700\u3082\u8fd1\u3044\u4e0b\u5074\u306e\u500d\u6570\u3092\u6c42\u3081\u307e\u3059: {b} * ({q}) = {multiple}\u3002",
        stepNegative3: "\u305d\u306e\u500d\u6570\u3092\u88ab\u9664\u6570\u304b\u3089\u5f15\u304d\u307e\u3059: {a} - ({multiple}) = {r}\u3002",
        conclusionGeneral: "\u6700\u7d42\u7b54\u3048: {a} = {b}({q}) + {r}\u3002\u518d\u69cb\u6210\u306e\u78ba\u8a8d\u7d50\u679c\u306f {reconstructed} \u3067\u30010 <= {r} < {b} \u306e\u6761\u4ef6\u3082\u6e80\u305f\u3057\u3066\u3044\u307e\u3059\u3002",
        conclusionNegative: "\u6700\u7d42\u7b54\u3048: {a} = {b}({q}) + {r}\u3002\u518d\u69cb\u6210\u306e\u78ba\u8a8d\u7d50\u679c\u306f {reconstructed} \u3067\u30010 <= {r} < {b} \u306e\u6761\u4ef6\u3082\u6e80\u305f\u3057\u3066\u3044\u307e\u3059\u3002"
      },
      methods: {
        floor: { title: "\u5e8a\u95a2\u6570\u9664\u7b97\u6cd5", text: "q = floor(a / b) \u3092\u6c42\u3081\u3001\u305d\u306e\u5f8c r = a - bq \u3092\u4f7f\u3044\u307e\u3059\u3002\u3053\u306e\u7d50\u679c\u3067\u306f q = {q}\u3001r = {r} \u3067\u3059\u3002" },
        lowerMultiple: { title: "\u6700\u3082\u8fd1\u3044\u4e0b\u5074\u306e\u500d\u6570\u6cd5", text: "{a} \u3092\u8d85\u3048\u306a\u3044 {b} \u306e\u500d\u6570\u306e\u3046\u3061\u3001\u6700\u3082\u8fd1\u3044\u3082\u306e\u3092\u63a2\u3057\u307e\u3059\u3002\u3053\u3053\u3067\u306f\u305d\u308c\u304c {multiple} \u306a\u306e\u3067\u3001\u4f59\u308a\u306f {r} \u3067\u3059\u3002" },
        verify: { title: "\u78ba\u8a8d\u65b9\u6cd5", text: "\u88ab\u9664\u6570\u3092\u518d\u69cb\u6210\u3057\u3066\u7b54\u3048\u3092\u78ba\u8a8d\u3057\u307e\u3059: {a} = {b}({q}) + {r}\u3002\u305d\u3057\u3066 0 <= {r} < {b} \u3092\u78ba\u304b\u3081\u307e\u3059\u3002" }
      }
    }
  });

  let currentLanguage = loadLanguage();
  let history = loadHistory();
  let currentResultRecord = null;
  let activeRecordId = null;

  function normalizeLanguage(value) {
    if (!value) {
      return "en";
    }

    const normalized = String(value).toLowerCase();
    if (SUPPORTED_LANGUAGES.includes(normalized)) {
      return normalized;
    }

    const aliasMap = {
      "zh-cn": "zh",
      "zh-tw": "zh",
      "zh-hans": "zh",
      "zh-hant": "zh",
      "pt-br": "pt",
      "pt-pt": "pt",
      "es-es": "es",
      "fr-fr": "fr",
      "de-de": "de",
      "id-id": "id",
      "vi-vn": "vi",
      "ja-jp": "ja",
      "ko-kr": "ko",
      "ar-sa": "ar",
      "hi-in": "hi",
      "fil-ph": "fil"
    };

    if (aliasMap[normalized]) {
      return aliasMap[normalized];
    }

    const base = normalized.split("-")[0];
    return SUPPORTED_LANGUAGES.includes(base) ? base : "en";
  }

  function loadLanguage() {
    try {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
        return stored;
      }
    } catch (error) {
      // Ignore storage errors and fall back to the browser language.
    }

    const browserLanguage = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return browserLanguage.startsWith("fil") ? "fil" : "en";
  }

  function persistLanguage() {
    try {
      localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    } catch (error) {
      // Ignore storage errors; the UI can still switch language for this session.
    }
  }

  function getCopy() {
    if (currentLanguage === "en") {
      return COPY.en;
    }

    if (currentLanguage === "fil") {
      return COPY.fil;
    }

    const override = EXTRA_COPY[currentLanguage];
    if (!override) {
      return COPY.en;
    }

    return deepMerge(COPY.en, override);
  }

  function t(path) {
    return path.split(".").reduce((value, key) => {
      if (value && Object.prototype.hasOwnProperty.call(value, key)) {
        return value[key];
      }
      return undefined;
    }, getCopy());
  }

  function isPlainObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }

  function deepMerge(base, override) {
    if (Array.isArray(base) && Array.isArray(override)) {
      return override.slice();
    }

    if (isPlainObject(base) && isPlainObject(override)) {
      const output = { ...base };
      Object.keys(override).forEach((key) => {
        const baseValue = base[key];
        const overrideValue = override[key];
        if (Array.isArray(baseValue) && Array.isArray(overrideValue)) {
          output[key] = overrideValue.slice();
        } else if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
          output[key] = deepMerge(baseValue, overrideValue);
        } else {
          output[key] = overrideValue;
        }
      });
      return output;
    }

    return override !== undefined ? override : base;
  }

  function applyTemplate(template, values) {
    return template.replace(/\{(\w+)\}/g, function (_, key) {
      return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : `{${key}}`;
    });
  }

  function localizeTemplate(template, values) {
    const resolvedValues = {};
    Object.keys(values || {}).forEach((key) => {
      resolvedValues[key] = escapeHtml(values[key]);
    });
    return applyTemplate(template, resolvedValues);
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function persistHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      return true;
    } catch (error) {
      return false;
    }
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `record_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "-";
    }
    return date.toLocaleString(currentLanguage === "fil" ? "fil-PH" : "en-US");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function showFeedback(message, variant) {
    $feedback
      .removeClass("d-none alert-success alert-danger alert-warning alert-info")
      .addClass(`alert-${variant}`)
      .html(message)
      .stop(true, true)
      .hide()
      .slideDown(180);
  }

  function hideFeedback() {
    $feedback.stop(true, true).slideUp(120, function () {
      $feedback.addClass("d-none").removeClass("alert-success alert-danger alert-warning alert-info").empty();
    });
  }

  function clearInlineAlert($element) {
    $element.addClass("d-none").removeClass("alert-success alert-danger alert-warning alert-info").empty();
  }

  function showInlineAlert($element, message, variant) {
    $element
      .removeClass("d-none alert-success alert-danger alert-warning alert-info")
      .addClass(`alert-${variant}`)
      .html(message);
  }

  function buildExplanation(record) {
    const a = record.dividend;
    const b = record.divisor;
    const q = record.quotient;
    const r = record.remainder;
    const reconstructed = record.reconstructed;
    const dividendIsNegative = a < 0;
    const copy = getCopy().explanation;
    const labels = EXPLANATION_HEADINGS[currentLanguage] || EXPLANATION_HEADINGS.en;
    const values = {
      a: a,
      b: b,
      q: q,
      r: r,
      multiple: b * q,
      reconstructed: reconstructed
    };

    const formalRule = dividendIsNegative ? copy.formalRuleNegative : copy.formalRuleGeneral;
    const whyThisWorks = dividendIsNegative ? copy.whyNegative : copy.whyGeneral;
    const stepTemplates = dividendIsNegative
      ? [copy.stepNegative1, copy.stepNegative2, copy.stepNegative3]
      : [copy.stepGeneral1, copy.stepGeneral2, copy.stepGeneral3];
    const conclusionTemplate = dividendIsNegative ? copy.conclusionNegative : copy.conclusionGeneral;
    const stepLines = stepTemplates
      .map((template) => `<div class="math-block">${localizeTemplate(template, values)}</div>`)
      .join("");
    const conclusion = localizeTemplate(conclusionTemplate, values);

    return `
      <p><strong>${escapeHtml(labels.formal)}:</strong> ${escapeHtml(formalRule)}</p>
      <p><strong>${escapeHtml(labels.why)}:</strong> ${escapeHtml(whyThisWorks)}</p>
      <p><strong>${escapeHtml(labels.step)}:</strong></p>
      ${stepLines}
      <p><strong>${escapeHtml(labels.conclusion)}:</strong> ${conclusion}</p>
    `;
  }

  function buildMethodItems(record) {
    const a = record.dividend;
    const b = record.divisor;
    const q = record.quotient;
    const r = record.remainder;
    const copy = getCopy().methods;
    const values = {
      a: a,
      b: b,
      q: q,
      r: r,
      multiple: b * q
    };

    return [
      {
        title: copy.floor.title,
        text: localizeTemplate(copy.floor.text, values)
      },
      {
        title: copy.lowerMultiple.title,
        text: localizeTemplate(copy.lowerMultiple.text, values)
      },
      {
        title: copy.verify.title,
        text: localizeTemplate(copy.verify.text, values)
      }
    ];
  }

  function scrollToElement($element) {
    if (!$element.length) {
      return;
    }

    $("html, body").stop(true).animate(
      {
        scrollTop: Math.max($element.offset().top - 24, 0)
      },
      650
    );
  }

  function revealIntroSection() {
    if ($introSection.hasClass("d-none")) {
      $introSection.removeClass("d-none").hide().slideDown(240, function () {
        scrollToElement($introSection);
      });
      return;
    }

    scrollToElement($introSection);
  }

  function setMemberCardState($card, isOpen) {
    const $button = $card.find("[data-member-toggle]");
    const $panel = $card.find(".member-panel");

    $card.toggleClass("is-open", isOpen);
    $button.attr("aria-expanded", isOpen ? "true" : "false");
    $card.find(".member-chevron").text(isOpen ? "-" : "+");

    if (isOpen) {
      $panel.stop(true, true).slideDown(220);
    } else {
      $panel.stop(true, true).slideUp(220);
    }
  }

  function parseInteger(value) {
    if (value === "" || value === null || value === undefined) {
      return null;
    }
    const number = Number(value);
    if (!Number.isFinite(number) || !Number.isInteger(number)) {
      return null;
    }
    return number;
  }

  function validateInputs(dividendValue, divisorValue) {
    const dividend = parseInteger(dividendValue);
    const divisor = parseInteger(divisorValue);

    if (dividend === null || divisor === null) {
      return {
        valid: false,
        message: t("messages.invalidNumbers")
      };
    }

    if (divisor <= 0) {
      return {
        valid: false,
        message: t("messages.invalidDivisor")
      };
    }

    return {
      valid: true,
      dividend,
      divisor
    };
  }

  function computeDivision(dividend, divisor) {
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend - divisor * quotient;
    const reconstructed = divisor * quotient + remainder;
    const verification = reconstructed === dividend && remainder >= 0 && remainder < divisor;

    return {
      quotient,
      remainder,
      reconstructed,
      verification
    };
  }

  function buildSteps(dividend, divisor, quotient, remainder) {
    const values = {
      dividend: dividend,
      divisor: divisor,
      quotient: quotient,
      remainder: remainder
    };
    const templates = STEP_TEMPLATES[currentLanguage] || STEP_TEMPLATES.en;
    return templates.map((template) => localizeTemplate(template, values));
  }

  function setProfileCardText($card, profile, fieldLabels) {
    $card.find(".member-label").text(profile.label);
    $card.find(".member-note").text(profile.note);

    const $fields = $card.find(".member-field");
    if ($fields.eq(0).length) {
      $fields.eq(0).find("span").text(fieldLabels.name);
      $fields.eq(0).find("strong").text(profile.name);
    }
    if ($fields.eq(1).length) {
      $fields.eq(1).find("span").text(fieldLabels.role);
      $fields.eq(1).find("strong").text(profile.roleValue);
    }

    $card.find(".member-description").text(profile.description);
  }

  function applyLanguageToStaticContent() {
    const copy = getCopy();
    const fieldLabels = PROFILE_FIELD_LABELS[currentLanguage] || PROFILE_FIELD_LABELS.en;

    document.title = copy.pageTitle;
    $('meta[name="description"]').attr("content", copy.metaDescription);
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    $(".hero-kicker").text(copy.heroKicker);
    $(".hero-title").text(copy.heroTitle);
    $(".hero-copy").text(copy.heroCopy);
    $getStartedBtn.text(copy.getStarted);
    $(".calculator-shortcut-kicker").text(copy.calculatorShortcutKicker || "Quick Access");
    $(".calculator-shortcut-title").text(copy.calculatorShortcutTitle || "Open Calculator");
    $calculatorShortcutBtn.attr("aria-label", copy.calculatorShortcutAria || "Go to calculator");
    $("#languageLabel").text(copy.languageLabel);
    SUPPORTED_LANGUAGES.forEach((language) => {
      const label = LANGUAGE_NAMES[language] || language.toUpperCase();
      $languageSelect.find(`option[value="${language}"]`).text(label);
    });
    $languageSelect.val(currentLanguage);

    $(".hero-insight").each(function (index) {
      const insight = (copy.heroInsights && copy.heroInsights[index]) || null;
      if (!insight) {
        return;
      }

      $(this).find(".hero-insight-label").text(insight.label);
      $(this).find(".hero-insight-copy").text(insight.copy);
    });

    $(".hero .formula-card-label").first().text(copy.coreAlgorithmLabel);
    $(".hero .formula-card-note").first().text(copy.coreAlgorithmNote);

    $("#introSection .section-tag").text(copy.intro.tag);
    $("#introSection .section-title").text(copy.intro.title);
    $("#introSection .intro-text").text(copy.intro.text);
    $("#introSection .intro-point p").each(function (index) {
      $(this).text(copy.intro.points[index] || $(this).text());
    });
    $viewTeamBtn.text(copy.intro.viewTeam);
    $("#introSection .formula-card-label").text(copy.intro.coreIdeaLabel);
    $("#introSection .formula-card-note").text(copy.intro.coreIdeaNote);

    $("#teamSection .section-tag").text(copy.team.tag);
    $("#teamSection .section-title").text(copy.team.title);
    $("#teamSection .steps-hint").text(copy.team.hint);
    $("#teamSection .team-group-professor .team-group-title").text(copy.team.professorGroupTitle || "Professor");
    $("#teamSection .team-group-professor .team-group-note").text(copy.team.professorGroupNote || "The assigned professor who guided and requested the system.");
    $("#teamSection .team-group").eq(1).find(".team-group-title").text(copy.team.studentGroupTitle || "Developer Team");
    $("#teamSection .team-group").eq(1).find(".team-group-note").text(copy.team.studentGroupNote || "Antonio leads the developer team, while the remaining members support the system build and presentation.");
    setProfileCardText($("#teamSection .member-card-professor"), {
      name: "Cely M. Delos Reyes",
      label: copy.team.professor.label,
      note: copy.team.professor.note,
      roleLabel: fieldLabels.role,
      roleValue: copy.team.professor.roleValue,
      description: copy.team.professor.description
    }, fieldLabels);
    setProfileCardText($("#teamSection .member-card").eq(1), {
      name: "Antonio Miguel Sarmiento",
      label: copy.team.members.antonio.label,
      note: copy.team.members.antonio.note,
      roleLabel: copy.team.members.antonio.roleLabel,
      roleValue: copy.team.members.antonio.roleValue,
      description: copy.team.members.antonio.description
    }, fieldLabels);
    setProfileCardText($("#teamSection .member-card").eq(2), {
      name: "Ronald Trinidad",
      label: copy.team.members.ronald.label,
      note: copy.team.members.ronald.note,
      roleLabel: copy.team.members.ronald.roleLabel,
      roleValue: copy.team.members.ronald.roleValue,
      description: copy.team.members.ronald.description
    }, fieldLabels);
    setProfileCardText($("#teamSection .member-card").eq(3), {
      name: "Jaynielle Zymie Ubaldo",
      label: copy.team.members.jaynielle.label,
      note: copy.team.members.jaynielle.note,
      roleLabel: copy.team.members.jaynielle.roleLabel,
      roleValue: copy.team.members.jaynielle.roleValue,
      description: copy.team.members.jaynielle.description
    }, fieldLabels);
    setProfileCardText($("#teamSection .member-card").eq(4), {
      name: "Comia Alfred",
      label: copy.team.members.comia.label,
      note: copy.team.members.comia.note,
      roleLabel: copy.team.members.comia.roleLabel,
      roleValue: copy.team.members.comia.roleValue,
      description: copy.team.members.comia.description
    }, fieldLabels);

    $("#calculatorSection .section-tag").text(copy.calculator.tag);
    $("#calculatorSection .section-title").text(copy.calculator.title);
    $('label[for="dividend"]').text(copy.calculator.dividendLabel);
    $('label[for="divisor"]').text(copy.calculator.divisorLabel);
    $("#dividend").attr("placeholder", copy.calculator.dividendPlaceholder);
    $("#divisor").attr("placeholder", copy.calculator.divisorPlaceholder);
    $("#divisionForm .form-text").eq(0).text(copy.calculator.dividendHint);
    $("#divisionForm .form-text").eq(1).text(copy.calculator.divisorHint);
    $computeBtn.text(copy.calculator.compute);
    $clearBtn.text(copy.calculator.clear);
    $(".helper-title").text(copy.calculator.helperTitle);
    $(".helper-list li").each(function (index) {
      $(this).text(copy.calculator.helperItems[index] || $(this).text());
    });

    $("#resultSection .section-tag").text(copy.result.tag);
    $("#resultSection .section-title").text(copy.result.title);
    $("#resultSection .storage-pill").text(copy.result.storagePill);
    $("#resultSection .empty-badge").text(copy.result.readyBadge);
    $("#resultSection .empty-title").text(copy.result.emptyTitle);
    $("#resultSection .empty-copy").text(copy.result.emptyCopy);
    $("#resultSection .stat-label").eq(0).text(copy.result.dividend);
    $("#resultSection .stat-label").eq(1).text(copy.result.divisor);
    $("#resultSection .stat-label").eq(2).text(copy.result.verification);
    $("#resultSection .result-card-label").eq(0).text(copy.result.quotient);
    $("#resultSection .result-card-label").eq(1).text(copy.result.remainder);
    $("#resultSection .formula-breakdown-title").eq(0).text(copy.result.formulaTitle);
    $("#resultSection .formula-breakdown-title").eq(1).text(copy.result.explanationTitle);
    $("#resultSection .formula-breakdown-title").eq(2).text(copy.result.methodsTitle);

    $("#stepsSection .section-tag").text(copy.steps.tag);
    $("#stepsSection .section-title").text(copy.steps.title);
    $("#stepsSection .steps-hint").text(copy.steps.hint);

    $("#historySection .section-tag").text(copy.history.tag);
    $("#historySection .section-title").text(copy.history.title);
    $("#historySection .small-note").text(copy.history.note);
    $clearAllBtn.text(copy.history.clearAll);
    $("#historySection thead th").eq(0).text(copy.history.headers[0]);
    $("#historySection thead th").eq(1).text(copy.history.headers[1]);
    $("#historySection thead th").eq(2).text(copy.history.headers[2]);
    $("#historySection thead th").eq(3).text(copy.history.headers[3]);
    $("#historySection thead th").eq(4).text(copy.history.headers[4]);
    $("#historySection thead th").eq(5).text(copy.history.headers[5]);
    $("#historySection thead th").eq(6).text(copy.history.headers[6]);

    $("#editModal .section-tag").text(copy.modal.tag);
    $("#editModalLabel").text(copy.modal.title);
    $('label[for="editDividend"]').text(copy.modal.dividendLabel);
    $('label[for="editDivisor"]').text(copy.modal.divisorLabel);
    $("#editModal .small-note").text(copy.modal.note);
    $("#editModal .modal-footer .btn-pcc-outline").text(copy.modal.cancel);
    $("#editModal .modal-footer .btn-pcc-primary").text(copy.modal.update);
    $("#editModal .btn-close").attr("aria-label", copy.modal.close);
  }

  function applyLanguage(language, options = {}) {
    const normalizedLanguage = normalizeLanguage(language);
    const shouldPersist = options.persist !== false;

    currentLanguage = normalizedLanguage;
    if (shouldPersist) {
      persistLanguage();
    }

    applyLanguageToStaticContent();
    renderHistory();

    if (currentResultRecord) {
      renderResult(currentResultRecord);
    } else {
      renderEmptyResult();
    }

    $languageSelect.val(currentLanguage);
  }

  function renderResult(record) {
    currentResultRecord = record;
    $resultEmpty.stop(true, true).addClass("d-none").hide();
    $resultContent.stop(true, true).removeClass("d-none").hide().fadeIn(180);

    $currentDividend.text(record.dividend);
    $currentDivisor.text(record.divisor);
    $currentQuotient.text(record.quotient);
    $currentRemainder.text(record.remainder);

    if (record.verification) {
      $currentVerification
        .text(t("result.valid"))
        .css({ color: "var(--pcc-green)" });
    } else {
      $currentVerification
        .text(t("result.check"))
        .css({ color: "var(--pcc-red)" });
    }

    $formulaDisplay.html(
      `<div>a = bq + r</div>
       <div class="mt-2">${escapeHtml(t("result.reconstructedLabel"))}: ${escapeHtml(record.dividend)} = ${escapeHtml(record.divisor)} * ${escapeHtml(record.quotient)} + ${escapeHtml(record.remainder)}</div>`
    );

    $checkDisplay.html(
      localizeTemplate(t("result.checkNote"), { value: record.reconstructed })
    );

    $explanationBody.html(buildExplanation(record));
    $methodsList.empty();
    buildMethodItems(record).forEach((item) => {
      $methodsList.append(`<li><strong>${escapeHtml(item.title)}:</strong> ${item.text}</li>`);
    });

    const steps = buildSteps(record.dividend, record.divisor, record.quotient, record.remainder);
    $stepsList.empty();
    steps.forEach((step) => {
      $stepsList.append(`<li>${escapeHtml(step)}</li>`);
    });
  }

  function renderEmptyResult() {
    currentResultRecord = null;
    $resultContent.stop(true, true).addClass("d-none").hide();
    $resultEmpty.stop(true, true).removeClass("d-none").hide().fadeIn(180);

    $currentDividend.text("-");
    $currentDivisor.text("-");
    $currentQuotient.text("-");
    $currentRemainder.text("-");
    $currentVerification.text("-").css({ color: "" });
    $formulaDisplay.text("-");
    $checkDisplay.text("-");
    $explanationBody.text("-");
    $methodsList.html(`<li class="methods-placeholder">${escapeHtml(t("result.methodsPlaceholder"))}</li>`);
    $stepsList.html(`<li class="steps-placeholder">${escapeHtml(t("steps.placeholder"))}</li>`);
  }

  function renderHistory(flashRecordId) {
    $historyBody.empty();

    if (!history.length) {
      $historyBody.append(`
        <tr id="historyEmptyRow">
          <td colspan="7" class="history-empty-cell">
            ${escapeHtml(t("history.empty"))}
          </td>
        </tr>
      `);
      const countLabel = t("history.count");
      $historyCount.text(typeof countLabel === "function" ? countLabel(0) : "0 records");
      return;
    }

    const countLabel = t("history.count");
    $historyCount.text(typeof countLabel === "function" ? countLabel(history.length) : `${history.length} records`);

    history.forEach((record, index) => {
      const row = $(`
        <tr data-record-id="${escapeHtml(record.id)}">
          <td>${index + 1}</td>
          <td class="monospaced">${escapeHtml(record.dividend)}</td>
          <td class="monospaced">${escapeHtml(record.divisor)}</td>
          <td class="monospaced">${escapeHtml(record.quotient)}</td>
          <td class="monospaced">${escapeHtml(record.remainder)}</td>
          <td>
            <div class="small">
              <div>${escapeHtml(formatDate(record.updatedAt || record.createdAt))}</div>
            </div>
          </td>
          <td>
            <div class="action-group">
              <button type="button" class="btn btn-pcc-outline history-action-btn edit-record" data-id="${escapeHtml(record.id)}">${escapeHtml(t("history.edit"))}</button>
              <button type="button" class="btn btn-outline-danger history-action-btn delete-record" data-id="${escapeHtml(record.id)}">${escapeHtml(t("history.delete"))}</button>
            </div>
          </td>
        </tr>
      `);

      $historyBody.append(row);
    });

    if (flashRecordId) {
      const $row = $historyBody.find(`tr[data-record-id="${flashRecordId}"]`);
      if ($row.length) {
        $row.addClass("history-row-flash");
        setTimeout(() => {
          $row.removeClass("history-row-flash");
        }, 1300);
      }
    }
  }

  function createRecord(dividend, divisor) {
    const computation = computeDivision(dividend, divisor);
    const now = new Date().toISOString();

    return {
      id: createId(),
      dividend,
      divisor,
      quotient: computation.quotient,
      remainder: computation.remainder,
      reconstructed: computation.reconstructed,
      verification: computation.verification,
      createdAt: now,
      updatedAt: now
    };
  }

  function saveNewRecord(record) {
    history.unshift(record);
    if (!persistHistory()) {
      history = history.filter((item) => item.id !== record.id);
      return false;
    }
    renderHistory(record.id);
    return true;
  }

  function updateExistingRecord(id, dividend, divisor) {
    const index = history.findIndex((item) => item.id === id);
    if (index === -1) {
      return {
        ok: false,
        reason: "missing"
      };
    }

    const previousRecord = history[index];
    const computation = computeDivision(dividend, divisor);
    const updatedRecord = {
      ...history[index],
      dividend,
      divisor,
      quotient: computation.quotient,
      remainder: computation.remainder,
      reconstructed: computation.reconstructed,
      verification: computation.verification,
      updatedAt: new Date().toISOString()
    };

    history[index] = updatedRecord;
    if (!persistHistory()) {
      history[index] = previousRecord;
      return {
        ok: false,
        reason: "storage"
      };
    }
    renderHistory(id);
    return {
      ok: true,
      record: updatedRecord
    };
  }

  function deleteRecord(id) {
    const record = history.find((item) => item.id === id);
    if (!record) {
      return;
    }

    const deleteConfirm = t("messages.deleteConfirm");
    const confirmed = window.confirm(
      typeof deleteConfirm === "function" ? deleteConfirm(record) : `Delete this computation?\n\nDividend: ${record.dividend}\nDivisor: ${record.divisor}`
    );
    if (!confirmed) {
      return;
    }

    const previousHistory = history.slice();
    history = history.filter((item) => item.id !== id);
    if (!persistHistory()) {
      history = previousHistory;
      showFeedback(t("messages.deleteStorage"), "danger");
      return;
    }
    renderHistory();

    if (activeRecordId === id) {
      activeRecordId = null;
      renderEmptyResult();
    }

    showFeedback(t("messages.deleteSuccess"), "warning");
  }

  function clearAllHistory() {
    if (!history.length) {
      showFeedback(t("messages.noRecords"), "info");
      return;
    }

    const confirmed = window.confirm(t("messages.clearConfirm"));
    if (!confirmed) {
      return;
    }

    const previousHistory = history.slice();
    history = [];
    if (!persistHistory()) {
      history = previousHistory;
      showFeedback(t("messages.clearStorage"), "danger");
      return;
    }
    renderHistory();
    activeRecordId = null;
    renderEmptyResult();
    showFeedback(t("messages.clearSuccess"), "warning");
  }

  function computeAndSave() {
    hideFeedback();
    clearInlineAlert($editAlert);

    const validation = validateInputs($dividend.val().trim(), $divisor.val().trim());
    if (!validation.valid) {
      showFeedback(validation.message, "danger");
      return;
    }

    const record = createRecord(validation.dividend, validation.divisor);
    const saved = saveNewRecord(record);
    if (!saved) {
      showFeedback(t("messages.saveStorage"), "danger");
      return;
    }
    activeRecordId = record.id;
    renderResult(record);
    showFeedback(t("messages.saveSuccess"), "success");
  }

  function resetForm() {
    $divisionForm[0].reset();
    hideFeedback();
    renderEmptyResult();
    $dividend.trigger("focus");
  }

  function openEditModal(id) {
    const record = history.find((item) => item.id === id);
    if (!record) {
      showFeedback(t("messages.missingRecord"), "danger");
      return;
    }

    clearInlineAlert($editAlert);
    $editRecordId.val(record.id);
    $editDividend.val(record.dividend);
    $editDivisor.val(record.divisor);
    editModal.show();
    setTimeout(() => {
      $editDividend.trigger("focus");
    }, 200);
  }

  function submitEditForm() {
    clearInlineAlert($editAlert);

    const recordId = $editRecordId.val();
    const validation = validateInputs($editDividend.val().trim(), $editDivisor.val().trim());

    if (!validation.valid) {
      showInlineAlert($editAlert, validation.message, "danger");
      return;
    }

    const updateResult = updateExistingRecord(recordId, validation.dividend, validation.divisor);
    if (!updateResult.ok) {
      if (updateResult.reason === "storage") {
        showInlineAlert($editAlert, t("messages.updateStorage"), "danger");
      } else {
        showInlineAlert($editAlert, t("messages.missingHistory"), "warning");
      }
      return;
    }

    activeRecordId = updateResult.record.id;
    renderResult(updateResult.record);
    showFeedback(t("messages.updateSuccess"), "success");
    editModal.hide();
  }

  $getStartedBtn.on("click", function () {
    revealIntroSection();
  });

  $calculatorShortcutBtn.on("click", function () {
    scrollToElement($("#calculatorSection"));
  });

  $viewTeamBtn.on("click", function () {
    scrollToElement($teamSection);
  });

  $divisionForm.on("submit", function (event) {
    event.preventDefault();
    computeAndSave();
  });

  $clearBtn.on("click", function () {
    resetForm();
  });

  $clearAllBtn.on("click", function () {
    clearAllHistory();
  });

  $historyBody.on("click", ".edit-record", function () {
    openEditModal($(this).data("id"));
  });

  $historyBody.on("click", ".delete-record", function () {
    deleteRecord($(this).data("id"));
  });

  $editForm.on("submit", function (event) {
    event.preventDefault();
    submitEditForm();
  });

  $("[data-member-toggle]").on("click", function () {
    const $card = $(this).closest("[data-member-card]");
    const isOpen = $card.hasClass("is-open");
    setMemberCardState($card, !isOpen);
  });

  $dividend.on("input", function () {
    if ($feedback.hasClass("alert-danger")) {
      hideFeedback();
    }
  });

  $divisor.on("input", function () {
    if ($feedback.hasClass("alert-danger")) {
      hideFeedback();
    }
  });

  $languageSelect.on("change", function () {
    applyLanguage($(this).val());
  });

  applyLanguage(currentLanguage, { persist: false });
});
