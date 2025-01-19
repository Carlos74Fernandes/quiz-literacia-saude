let currentQuestionIndex = 0;
let score = 0;
let userData = {};

const questions = [
  {
    question: "Qual é a principal função dos cuidados primários de saúde?",
    options: [
      { text: "Prevenção e tratamento de doenças", correct: true },
      { text: "Tratamento de doenças graves", correct: false },
      { text: "Realização de exames complexos", correct: false },
      { text: "Cuidados a longo prazo", correct: false }
    ]
  }
  {
  Question: "Em que data se celebra o Dia Internacional da Literacia?",
Options: [
    {Text: "08 de Setembro",correct: true },
    {Text: "03 de Dezembro",correct: false },
    {Text: "05 de Novembro",correct: false },
    {Text: "10 de Janeiro",correct: false },
]
},
{
Question: "Em que data foi constituída a Sociedade Portuguesa de Literacia em Saúde (SPLS)?",
Options: [
  {Text: "13 de Fevereiro de 2019",correct: false },
  {Text: "10 de Março de 2020",correct: false },
  {Text: "19 de Janeiro de 2022",correct: true },
  {Text: "06 de Outubro de 2018",correct: false },
]
},

  // Adicione outras questões aqui...
];

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  userData.name = document.getElementById("name").value;
  userData.sex = document.getElementById("sex").value;
  userData.dob = document.getElementById("dob").value;
  userData.education = document.getElementById("education").value;

  // Ocultar tela de login e mostrar quiz
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  loadQuestion();
});

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;
  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const div = document.createElement("div");
    div.classList.add("answer");
    div.textContent = option.text;
    div.addEventListener("click", () => handleAnswer(option, div));
    answersContainer.appendChild(div);
  });
}

function handleAnswer(option, answerElement) {
  // Desabilitar todas as respostas após a seleção
  const answers = document.querySelectorAll('.answer');
  answers.forEach(answer => {
    answer.style.pointerEvents = 'none';  // Desabilita o clique
  });

  const feedbackContainer = document.getElementById("feedback-container");

  if (option.correct) {
    answerElement.classList.add("correct");
    feedbackContainer.innerHTML = `<div class="star star-happy"></div><p>Parabéns acertou, vamos a mais uma questão!</p>`;
    score++;
  } else {
    answerElement.classList.add("incorrect");
    feedbackContainer.innerHTML = `<div class="star star-sad"></div><p>Não foi desta que acertou, mas não vamos esquecer que a resposta correta é: ${getCorrectAnswer()}</p>`;
  }

  // Mostrar botão para próxima questão
  document.getElementById("next-question").style.display = "inline-block";
}

function getCorrectAnswer() {
  const question = questions[currentQuestionIndex];
  const correctOption = question.options.find(option => option.correct);
  return correctOption.text;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    document.getElementById("feedback-container").innerHTML = '';
    document.getElementById("next-question").style.display = "none";
  } else {
    alert("Você completou o quiz! Seu resultado final é: " + score);
    // Aqui você pode enviar os dados para o backend para salvar e analisar.
  }
}
