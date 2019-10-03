$(document).ready(function(){

    // ================
    // VARIABLES
    // ================

        var currentQuestion; 
        var correctAnswer; 
        var incorrectAnswer; 
        var unanswered; 
        var seconds; 
        var time; 
        var answered; 
        var userSelect;
        var messages = {
            correct: "Hay! That's correct!",
            incorrect: "Neigh ... that's not the right answer.", 
            endTime: "Whoa! Looks like you ran out of time!",
            finished: "So, how many correct answers did you manage to wrangle?"
        };
    
        //Question Bank
        var triviaQuestions = [
            {	question: "Which of these things can a horse NOT do?",
                answerList: ["Burp",
                    "Vomit",
                    "Breathe through its mouth",
                    "All of the above"
                    ],
                answer: 3,
                image: "assets/images/Coughing_Horse.jpg",
                answerText: "The inability to regurgitate or burp can result in a life-threatening condition called colic. And a horse can only breathe through its nostrils."
            },
    
            {	question: "How many gallons of water does the average horse drink each day?",
                answerList: [	"5 gallons",
                            "10 gallons",
                            "18 gallons",
                            "25 gallons",
                            ],
                answer: 3,
                image: "assets/images/Horse_Drinking.gif",
                answerText: "And sometimes more than 25 gallons in hotter weather."
            },
    
            {	question: "A horse’s height is measured at its shoulder in units known as 'hands.' How much is 1 hand equal to?",
                answerList: [	"2 inches",
                            "4 inches",
                            "6 inches",
                            "12 inches",
                            ],
                answer: 1,
                image: "assets/images/Sampson_Tallest_Horse.jpg",
                answerText: "The tallest horse on record was a Shire named Sampson. He was 21.2 hands (7 feet, 2 inches) tall at the shoulder. He was born in 1846 in Toddington Mills, England."
            },
    
            {	question: "How does the size of a horse’s brain compare to that of a human brain??",
                answerList: [	"It is twice as large.",
                            "It is the same size.",
                            "It is half the size.",
                            "It is a quarter the size.",
                            ],
                answer: 2,
                image: "assets/images/Horse_Brain.jpg",
                answerText: "An adult horse’s brain weighs 22 ounces, about half that of a human brain. A horse's teeth take up more space in its head than its brain does."
            },
    
            {	question: "How many horses live in the United States?",
                answerList: [	"1 million",
                            "9 million",
                            "20 million",
                            "50 million",
                            ],
                answer: 1,
                image: "assets/images/Lots_of_Horses.jpg",
                answerText: "The US horse industry has an economic effect of $39 billion annually on just 9 million American horses. (Source: American Horse Council)."
            },
    
            {	question: "The oldest known horse lived how many years?",
                answerList: [	"40 years",
                                "51 years",
                                "62 years",
                                "73 years",
                            ],
                answer: 2,
                image: "assets/images/Old_Billy.jpg",
                answerText: "A 19th-Century horse named 'Old Billy' reportedly lived 62 years. (Source: Manchester Museum). Most domestic horses live into their late 20s."
            },
    
            {	question: "When a horse is at a full gallop, how many feet are off the ground at the same time?",
                answerList: [	"1",
                            "2",
                            "3",
                            "4",
                            ],
                answer: 3,
                image: "assets/images/Galloping_Horse.gif",
                answerText: "In 1872, Leland Stanford made a bet that at some point in the gallop all 4 hooves would be off the ground at the same time. Eadweard Muybridge proved him right by using a series of 24 cameras to photograph a racehorse named Sallie Gardner."
            },		
    
            {	question: "What is a young female horse called?",
                answerList: [	"Foal",
                            "Filly",
                            "Colt",
                            "Pony",
                            ],
                answer: 1,
                image: "assets/images/Filly.jpg",
                answerText: "A young male horse is known as a colt. A foal is a newborn or very young horse, male or female. A pony is a horse of a small breed, especially shorter than 14 hands 2 inches (58 inches)."
            },		
    
            {	question: "What is a gelding?",
                answerList: [	"A young male horse",
                            "A male horse that has been castrated",
                            "A female horse that has not had a foal",
                            "A female horse that has had a foal",
                            ],
                answer: 1,
                image: "assets/images/Surprised_Horse_Eyes.gif",
                answerText: "Colts are usually castrated (or gelded) between 6 and 12 months of age. Gelding has long been used as a method of controlling aggressive behavior and making farm management easier."
            },		
    
            {	question: "Which of these is FALSE about a horse’s vision?",
                answerList: [	"Horses are color blind.",
                            "A horse can see almost 360 degrees.",
                            "A horse has blind spots in front, beneath its head, and directly behind.",
                            "Horses have the largest eyes of any land mammal.",
                            ],
                answer: 0,
                image: "assets/images/Horse_Eye.jpg",
                answerText: "Horses have dichromatic color vision and also the ability to switch between monocular and binocular vision."
            },		
    
        ];
    
    // =========
    // FUNCTIONS
    // =========
    
        //This hides the game area when page loads
        $("#gameCol").hide();
        
        //This captures user click on start button to create a new game
        $("#startButton").on("click", function(){
            $("#horseshoe").hide();
            $(this).hide();
            newGame();
        });
    
        //This captures the user's click on the reset button to create a new game
        $("#startOverButton").on("click", function(){
            $(this).hide();
            newGame();
        });
    
        //This function sets up the page for a new game emptying all areas and showing game area
        function newGame(){
            $("#gameCol").show();
            $("#finalMessage").empty();
            $("#correctAnswers").empty();
            $("#incorrectAnswers").empty();
            $("#unanswered").empty();
            $("#gif").hide();
            $("#gifCaption").hide();
            currentQuestion = 0;
            correctAnswer = 0;
            incorrectAnswer = 0;
            unanswered = 0;
            newQuestion();
        }
    
        //This function displays the next question
        function newQuestion(){
            $("#message").empty();
            $("#correctedAnswer").empty();
            $("#gif").hide();
            $("#gifCaption").hide();
            answered = true;
            
            //This function displays the new question
            $("#currentQuestion").html("Question " + (currentQuestion+1) + " of " + triviaQuestions.length);
            $(".question").html(triviaQuestions[currentQuestion].question);
    
            //This function displays the new questions's answer options in multiple choice form
            for(var i = 0; i <= 5; i++){
    
                var choices = $("<div>");
                choices.text(triviaQuestions[currentQuestion].answerList[i]);
                choices.attr({"data-index": i });
                choices.addClass("thisChoice");
                $(".answerList").append(choices);
            }
    
            //This sets the timer
            countdown();
    
            //When user clicks on an answer, this pauses the time and displays the correct answer if choice was incorrect 
            $(".thisChoice").on("click",function(){
                    userSelect = $(this).data("index");
                    clearInterval(time);
                    answerPage();
                });
            }
    
        //This function is for the timer countdown
        function countdown(){
            seconds = 15;
            $("#timeLeft").html("00:" + seconds);
            answered = true;
            //Sets a delay of one second before the timer starts
            time = setInterval(showCountdown, 1000);
        }
    
        //This function displays the countdown
        function showCountdown(){
            seconds--;
    
            if(seconds < 10) {
                $("#timeLeft").html("00:0" + seconds);	
            } else {
                $("#timeLeft").html("00:" + seconds);	
            }
            
            if(seconds < 1){
                clearInterval(time);
                answered = false;
                answerPage();
            }
        }
    
        //This function takes the user to the answer page after the user selects an answer or timer runs out
        function answerPage(){
            $("#currentQuestion").empty();
            $(".thisChoice").empty(); //Clears question page
            $(".question").empty();
            $("#gif").show();
            $("#gifCaption").show();
    
            var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
            var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
            //This adds the jpg or gif that corresponds to this quesiton
            var gifImageLink = triviaQuestions[currentQuestion].image;
            var newGif = $("<img>");
            newGif.attr("src", gifImageLink);
            newGif.addClass("gifImg");
            $("#gif").html(newGif);
    
           //This adds a line of text below the image explaining a little more about correct answer.
            var gifCaption = triviaQuestions[currentQuestion].answerText;
                newCaption = $("<div>");
                newCaption.html(gifCaption);
                newCaption.addClass("gifCaption");
                $("#gifCaption").html(newCaption);
            
            //This checks to see if user choice is correct, incorrect, or unanswered
            if((userSelect === rightAnswerIndex) && (answered === true)){
                correctAnswer++;
                $("#message").html(messages.correct);
            } else if((userSelect != rightAnswerIndex) && (answered === true)){
                incorrectAnswer++;
                $("#message").html(messages.incorrect);
                $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
            } else{
                unanswered++;
                $("#message").html(messages.endTime);
                $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
                answered = true;
            }
            
            if(currentQuestion === (triviaQuestions.length-1)){
                setTimeout(scoreboard, 6000);
            } else{
                currentQuestion++;
                setTimeout(newQuestion, 6000);
            }	
        }
    
        //Function tp display the game stats
        function scoreboard(){
            $("#timeLeft").empty();
            $("#message").empty();
            $("#correctedAnswer").empty();
            $("#gif").hide();
            $("#gifCaption").hide();
    
            $("#finalMessage").html(messages.finished);
            $("#correctAnswers").html("Correct Answers: " + correctAnswer);
            $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
            $("'#unanswered").html("Unanswered: " + unanswered);
            $("#startOverButton").addClass('reset');
            $("#startOverButton").show();
            $("#startOverButton").html("Mount Up & Try Again?");
        }
    });