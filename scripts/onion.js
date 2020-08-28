var app = angular.module('onionApp', []);

app.controller('onionController', function($scope) {

  $scope.scoreCount = 0;
  
  $scope.total = '10';

  $scope.leftTitle = '';
  $scope.rightTitle = '';

  $scope.correct = '';

  $scope.leftNot = false;
  $scope.rightNot = false;

  $scope.popupBox = false;
  $scope.introRound = false;

  $scope.introCorrect = false;
  $scope.introWrong = false;

  $scope.final = false;

  $scope.nots = ['ISIS issues travel warning to coronavirus-hit countries',
            'NASA Fixes Mars Lander By Telling It to Hit Itself With a Shovel',
            'Las Vegas strip club to offer drive-through peep show',
            'Fugitive cow keeps evading police in South Florida',
            "Johnny Depp to Produce 'Michael Jackson, as Told By His Glove' Musical",
            "A farm outside Moscow is testing VR goggles for cows",
            "Ad stating alcohol is a drug blocked as 'too political'",
            "US energy department rebrands fossil fuels as 'molecules of freedom'",
            "Woman fell asleep in her parked car, woke to find it missing",
            "Dairy Queen burgers are not made of human flesh, county coroner is forced to confirm",
  ];

  $scope.onions = ['Pepperidge Factory Farm Under Fire For Inhumane Treatment Of Milanos',
                "So-Called ‘Flash Sale’ May Have Been Strategized Weeks In Advance",
                "Report Finds Average U.S. College Student Over $28,000 In Debt To Yakuza",
                "Olive Garden Food Scientists Rapidly Running Out Of Foods To Scampi",
                "Elon Musk Rushes To Aid Of Overturned Tesla Pinned On Top Of Child",
                "Parents Impressed By How Big Baby Has Gotten After Just 16 Months Of CrossFit",
                "CG Supervisor For ‘Cats’ Thought He Actually Did An Okay Job",
                "Study Finds Comparing Yourself To Others Actually Pretty Good Way To Gauge Success",
                "Hiker Trapped For Days Under Fallen Boulder Survives By Cutting Off Own Ponytail",
                "NYC Opens $500 Million Decoy Subway Station To Catch Turnstile Jumpers",
  ];

  $scope.selectNot = function(side){
    if(this.introRound){
      if(side == this.correct){
        this.introRound = false;
        this.openIntroCorrect();
      }else{
        this.openIntroWrong();
      }
    }else{
      if(side == this.correct){
        this.scoreCount++;
      }

      this.leftNot = false;
      this.rightNot = false;

      if(this.nots.length > 1){
        this.nots.pop();
        this.onions.pop();

        this.populate();
      }else{
        this.openFinal();
      }
    }

  }
  
  $scope.initBase = function(){
    var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

    if(isTouch){
      this.popupBox = true;
      this.popupTitle = 'Welcome!';
      this.popupContent1 = "It's simple, really...";
      this.popupContent2 = "Two article titles, one is from the satire site The Onion, the other is a real article AKA #notTheOnion";
      this.popupContent3 = "Step 1: Select the article title that's #notTheOnion";
      this.popupContent4 = "Step 2: Click the arrow at the bottom to go to the next question";
      this.popupButton = "Let's try an example";
    }else{
      this.popupBox = true;
      this.popupTitle = 'Welcome!';
      this.popupContent1 = "It's simple, really...";
      this.popupContent2 =  "Two article titles, one is from the satire site The Onion, the other is a real article AKA #notTheOnion";
      this.popupContent3 = "All you have to do: Select the article title that's #notTheOnion";
      this.popupButton = "Let's try an example";
    }

    this.nots = this.shuffleArray(this.nots);
    this.onions = this.shuffleArray(this.onions);

    this.nots.push("This One Is #notTheOnion, CHOOSE THIS ONE");
    this.onions.push("This One Is From The Onion, DON'T CHOOSE IT");
    this.introRound = true;

    this.populate();
  }

  $scope.populate = function(){
    console.log("populating..");

    x = this.nots.length - 1;

    randbit = Math.round(Math.random());

    console.log(">>" + randbit);

    if(randbit == 0){

      this.leftTitle = this.nots[x];
      this.rightTitle = this.onions[x];

      this.correct = 'L';
    }else{
      this.leftTitle = this.onions[x];
      this.rightTitle = this.nots[x];

      this.correct = 'R';
    }
  }

  $scope.shuffleArray = function(arr){
    var ctr = arr.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
  }

  $scope.mobileSelect = function(side){

    if(side == 'L'){
      if(this.leftNot){
        this.leftNot = false;
      }else{
        this.rightNot = false;
        this.leftNot = true;
      }
    }else if(side == 'R'){
      if(this.rightNot){
        this.rightNot = false;
      }else{
        this.leftNot = false;
        this.rightNot = true;
      }
    }
    
  }

  $scope.openIntroCorrect = function(){
    this.popupBox = true;
    this.popupTitle = 'Great Job!';
    this.popupContent1 = "Now that wasn't so hard, was it?";
    this.popupContent2 = "";
    this.popupContent3 = "";
    this.popupContent4 = "";
    this.popupButton = "Here Goes the Real Thing";

    this.nots.pop();
    this.onions.pop();

    this.leftNot = false;
    this.rightNot = false;

    this.populate();
  }

  $scope.openIntroWrong = function(){
    this.popupBox = true;
    this.popupTitle = "C'mon Bruh";
    this.popupContent1 = "The answer was literally spelled out for you.";
    this.popupContent2 = "";
    this.popupContent3 = "";
    this.popupContent4 = "";
    this.popupButton = "Try Again";
  }

  $scope.openFinal = function(){
    this.popupBox = true;
    this.final = true;
    this.popupTitle = "All Done";
    if(this.scoreCount == 0){
      this.popupContent1 = "I feel like you didn't even try...";
    }else if(this.scoreCount < (this.total / 2)){
      this.popupContent1 = "Not bad...not great, but it literally could have been worse.";
    }else if(this.scoreCount < this.total){
      this.popupContent1 = "Not everyone can be perfect.";
    }else{
      this.popupContent1 = "Wow! you should really be proud you wasted all this time.";
    }
    this.popupContent2 = "";
    this.popupContent3 = "Final Score: " + this.scoreCount;
    this.popupContent4 = "";
    this.popupButton = "Bonus Round";
  }

  $scope.mobileNext = function(){
    if(this.leftNot){
      side = 'L';
    }else if(this.rightNot){
      side = 'R';
    }else{
      return null;
    }

    if(this.introRound){
      if(side == this.correct){
        this.introRound = false;
        this.openIntroCorrect();
      }else{
        this.openIntroWrong();
      }
    }else{
      if(side == this.correct){
        this.scoreCount++;
      }

      this.leftNot = false;
      this.rightNot = false;

      if(this.nots.length > 1){
        this.nots.pop();
        this.onions.pop();

        this.populate();
      }else{
        this.openFinal();
      }
    }
  }

  $scope.closePopup = function(){
    if(this.final){
      window.location.href = "http://www.theonion.com";
    }else{
      this.popupBox = false;
    }
  }

});
