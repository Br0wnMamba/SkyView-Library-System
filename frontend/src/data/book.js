import { covers } from "./covers";

export const Books = {
	1: {
	  title: "Percy Jackson & the Olympians",
	  authors: ["Rick Riordan"],
	  genre: "Fiction",
	  cover: covers.PercyJackson,
	  availability: {
		physical: 4,
		digital: 0,
	  },
	  desc: "Percy Jackson & the Olympians is a fantasy novel series",
	  content: {
		1: "Twelve-year-old Percy Jackson struggles with school and life until a school trip turns deadly, revealing a truth he never expected—he's the son of Poseidon. After battling a mythical creature, he’s taken to Camp Half-Blood, a safe haven for demigods. His journey into the world of Greek mythology begins.",
		2: "At Camp Half-Blood, Percy meets fellow demigods Annabeth and Grover. He learns the gods are real and very much alive. When Zeus’s master lightning bolt is stolen, Percy is accused. To clear his name, he embarks on a quest across America to recover the bolt and prevent a divine war.",
		3: "Percy’s journey takes him face to face with legendary monsters like Medusa and Ares. As he travels west toward the Underworld, Percy discovers truths about friendship, betrayal, and his own abilities. The chapter climaxes with a dangerous descent into Hades’ realm, setting up an epic confrontation with the forces of darkness.",
	  },
	},
	2: {
	  title: "The Thirteenth Tale",
	  authors: ["Diane Setterfield"],
	  genre: "Mystery",
	  cover: covers.ThirteenthTale,
	  availability: {
		physical: 6,
		digital: 4,
	  },
	  desc: "From Diane Setterfield's series",
	  content: {
		1: "Margaret Lea, a quiet biographer working in a rare bookstore, is summoned by the famous and reclusive author Vida Winter. Vida, known for fabricating her life stories, promises to finally tell the truth. Margaret, intrigued by the mystery, accepts the job and travels to Winter’s eerie estate.",
		2: "Vida begins recounting her past, centered around the haunted Angelfield estate and a pair of enigmatic twins, Adeline and Emmeline. As the narrative unfolds, Margaret is drawn into the tragic history of the family, where love, madness, and loss intertwined to create a legacy of secrets and sorrow.",
		3: "Margaret investigates the inconsistencies in Vida’s story, visiting Angelfield and digging through records. She uncovers disturbing truths about identity, obsession, and the consequences of buried trauma. As Vida’s final tale comes to a close, Margaret must reconcile the horrors of the past with her own buried family grief.",
	  },
	},
	3: {
	  title: "My Sister's Keeper",
	  authors: ["Jodi Picoult", "Mark Fisher"],
	  genre: "Fiction",
	  cover: covers.MySistersKeeper,
	  availability: {
		physical: 2,
		digital: 3,
	  },
	  desc: "Based upon Anissa and Marissa Ayala",
	  content: {
		1: "Anna Fitzgerald was genetically engineered to be a perfect match for her older sister Kate, who has leukemia. After years of painful procedures and sacrifices, Anna hires a lawyer to sue her parents for medical emancipation, setting off a legal and emotional battle that shakes the entire family.",
		2: "As the trial unfolds, each family member reflects on their decisions, love, and guilt. Kate’s deteriorating condition intensifies the conflict. Flashbacks reveal the deep bonds and silent resentments. Anna’s act is not rebellion—it’s an attempt to take control of her life, as well as to honor her sister’s unspoken wishes.",
		3: "In a heartbreaking twist, the story reveals the true reason Anna filed the lawsuit. The court’s decision is overshadowed by tragedy, forcing the family to confront loss in its rawest form. The chapter leaves readers questioning morality, family, and the complexity of love when life and death hang in the balance.",
	  },
	},
	4: {
	  title: "The Kite Runner",
	  authors: ["Khaled Hosseini"],
	  genre: "Fiction",
	  cover: covers.KiteRunner,
	  availability: {
		physical: 0,
		digital: 0,
	  },
	  desc: "The Kite Runner is a coming-of-age story about redemption",
	  content: {
		1: "In 1970s Kabul, Amir, a privileged boy, shares a complicated friendship with Hassan, the son of his father's servant. Despite their closeness, class and ethnic divides loom. A kite-fighting tournament becomes the backdrop for betrayal, shaping Amir’s guilt and altering their lives forever in a single, defining moment.",
		2: "Years later, now living in America, Amir is haunted by his childhood cowardice and the loss of his homeland to war. When a call from an old family friend offers a chance at redemption, Amir returns to Taliban-ruled Afghanistan to confront the painful past and seek forgiveness for his sins.",
		3: "Amir’s journey home is filled with danger, discovery, and grief. He uncovers shocking secrets about his family and Hassan’s fate. Confronting old enemies and adopting Hassan’s orphaned son, Amir finds a path to redemption. The story ends on a hopeful note, with healing beginning through love and sacrifice.",
	  },
	},
	5: {
	  title: "The 48 Laws of Power",
	  authors: ["Robert Greene"],
	  genre: "Non-Fiction",
	  cover: covers.Laws48,
	  availability: {
		physical: 2,
		digital: 0,
	  },
	  desc: "48 Laws of Power details the laws for attaining power in life, business, and more, and gives historical examples of each law in practice.",
	  content: {
		1: "Law 1 – Never Outshine the Master: Always make your superiors feel superior. If you appear too talented, they may feel threatened. Historical figures like Nicolas Fouquet learned this lesson the hard way. Subtlety and humility ensure you gain influence without challenging authority directly, allowing your power to grow steadily.",
		2: "Law 2 – Never Put Too Much Trust in Friends, Learn How to Use Enemies: Friends are emotional and may betray you. Enemies, once converted, often become fiercely loyal. Greene uses historical examples to show how strategic relationships—even with rivals—can be more beneficial than blind trust in allies.",
		3: "Law 3 – Conceal Your Intentions: If others can’t predict your moves, they can’t counter them. Keeping your strategy hidden allows you to manipulate outcomes without opposition. Through analogies and events in history, Greene emphasizes the power of mystery in maintaining control and shaping perception.",
	  },
	},
  };
  

export const DisplayContent = [
  {
    title: "Recently Added",
    books: [1, 2, 3],
  },
  {
    title: "Top Picks",
    books: [4, 5],
  },
];
