const BASE_API_URL = "https://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

let categories = [];

async function getCategoryIds() {

  let response = await axios.get(`${BASE_API_URL}categories?count=100`);
  let catIds = response.data.map(c => c.id);
  return _.sampleSize(catIds, NUM_CATEGORIES);
}

async function getCategory(catId) {
  let response = await axios.get(`${BASE_API_URL}category?id=${catId}`);
  let cat = response.data;
  let allClues = cat.clues;
  let randomClues = _.sampleSize(allClues, NUM_CLUES_PER_CAT);
  let clues = randomClues.map(c => ({
    question: c.question,
    answer: c.answer,
    showing: null,
  }));

  return { title: cat.title, clues };
}


async function fillTable() {
  $("#jeopardy thead").empty();
  let $tr = $("<tr>");
  for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
    $tr.append($("<th>").text(categories[catIdx].title));
  }
  $("#jeopardy thead").append($tr);
  $("#jeopardy tbody").empty();
  for (let clueIdx = 0; clueIdx < NUM_CLUES_PER_CAT; clueIdx++) {
    let $tr = $("<tr>");
    for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
      $tr.append($("<td>").attr("id", `${catIdx}-${clueIdx}`).text("?"));
    }
    $("#jeopardy tbody").append($tr);
  }
}

function handleClick(evt) {
  let id = evt.target.id;
  let [catId, clueId] = id.split("-");
  let clue = categories[catId].clues[clueId];

  let msg;

  if (!clue.showing) {
    msg = clue.question;
    clue.showing = "question";
  } else if (clue.showing === "question") {
    msg = clue.answer;
    clue.showing = "answer";
  } else {
    
    return
  }
 
  $(`#${catId}-${clueId}`).html(msg);
}



async function setupAndStart() {
  let catIds = await getCategoryIds();

  categories = [];

  for (let catId of catIds) {
    categories.push(await getCategory(catId));
  }

  fillTable();
}


$("#restart").on("click", setupAndStart);

$(async function () {
    setupAndStart();
    $("#jeopardy").on("click", "td", handleClick);
  }
);
