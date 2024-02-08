(function(){
    'use strict';
    console.log("reading js");

    const myForm = document.querySelector('form');
    const myMadlib = document.querySelector('#madlib');

    myForm.addEventListener('submit',function(event){
        event.preventDefault();
        const name1 = document.querySelector('#name1').value;
        const noun1 = document.querySelector('#noun1').value;
        const verb1 = document.querySelector('#verb1').value;
        const adj1 = document.querySelector('#adj1').value;
        const momentintime = document.querySelector('#momentintime').value;
        const adj2 = document.querySelector('#adj2').value;
        const animalplural = document.querySelector('#animalplural').value;
        const bodypart1 = document.querySelector('#bodypart1').value;
        const verb2 = document.querySelector('#verb2').value;
        const adj3 = document.querySelector('#adj3').value;
        const verb3 = document.querySelector('#verb3').value;
        const verb4 = document.querySelector('#verb4').value;
        const object = document.querySelector('#object').value;
        const bodypart2 = document.querySelector('#bodypart2').value;
        const verb5 = document.querySelector('#verb5').value;
        const verb6 = document.querySelector('#verb6').value;
        const noun2 = document.querySelector('#noun2').value;
        const verb7 = document.querySelector('#verb7').value;
        const adj4 = document.querySelector('#adj4').value;
        const adj5 = document.querySelector('#adj5').value;
        const verb8 = document.querySelector('#verb8').value;
        const adj6 = document.querySelector('#adj6').value;
        const adj7 = document.querySelector('#adj7').value;
        const noun3 = document.querySelector('#noun3').value;
        const noun4 = document.querySelector('#noun4').value;
        const name2 = document.querySelector('#name2').value;

        let myText;

        if (name1 === '') {
            myText = "Please provide a name";
            document.querySelector('#name1').focus();

        } else if (noun1 === '') {
            myText = "Please provide a noun";
            document.querySelector('#noun1').focus();

        } else if (verb1 === '') {
            myText = "Please provide a verb";
            document.querySelector('#verb1').focus();

        } else if (adj1 === '') {
            myText = "Please provide an adjective";
            document.querySelector('#adj1').focus();

        } else if (momentintime === '') {
            myText = "Please provide a moment in time";
            document.querySelector('#momentintime').focus();

        } else if (adj2 === '') {
            myText = "Please provide an adjective";
            document.querySelector('#adj2').focus();

        } else if (animalplural === '') {
            myText = "Please provide a plural animal";
            document.querySelector('#animalplural').focus();

        } else if (bodypart1 === '') {
            myText = "Please provide a body part";
            document.querySelector('#bodypart1').focus();

        } else if (verb2 === '') {
            myText = "Please provide a verb";
            document.querySelector('#verb2').focus();

        } else if (adj3 === '') {
            myText = "Please provide an adjective";
            document.querySelector('#adj3').focus();

        } else if (verb3 === '') {
            myText = "Please provide a verb";
            document.querySelector('#verb3').focus();

        } else if (verb4 === '') {
            myText = "Please provide a verb";
            document.querySelector('#verb4').focus();

        } else if (object === '') {
            myText = "Please provide an object";
            document.querySelector('#object').focus();

        } else if (bodypart2 === '') {
            myText = "Please provide a body part";
            document.querySelector('#bodypart2').focus();

        } else if (verb5 === '') {
            myText = "Please provide a verb";
            document.querySelector('#verb5').focus();

        } else if (verb6 === '') {
            myText = "Please provide a verb";
            document.querySelector('#verb6').focus();

        } else if (noun2 === '') {
            myText = "Please provide a noun";
            document.querySelector('#noun2').focus();

        } else if (verb7 === '') {
            myText = "Please provide a verb";
            document.querySelector('#verb7').focus();

        } else if (adj4 === '') {
            myText = "Please provide an adjective";
            document.querySelector('#adj4').focus();

        } else if (adj5 === '') {
            myText = "Please provide an adjective";
            document.querySelector('#adj5').focus();

        } else if (verb8 === '') {
            myText = "Please provide a verb";
            document.querySelector('#verb8').focus();

        } else if (adj6 === '') {
            myText = "Please provide an adjective";
            document.querySelector('#adj6').focus();

        } else if (adj7 === '') {
            myText = "Please provide an adjective";
            document.querySelector('#adj7').focus();

        } else if (noun3 === '') {
            myText = "Please provide a noun";
            document.querySelector('#noun3').focus();

        } else if (noun4 === '') {
            myText = "Please provide an adverb";
            document.querySelector('#noun4').focus();

        } else if (name2 === '') {
            myText = "Please provide a name";
            document.querySelector('#name2').focus();
            
        }  else{
            document.querySelector('#overlay').className = "showing";
            myText = `Dear ${name1},

            I am writing this letter because I don’t have the ${noun1} to tell you this in person. I have been ${verb1} about doing this this for a while, and I honestly think it is the ${adj1} decision for the both of us.
            
            I think we should break up. I feel like the ${momentintime} of our relationship was ${adj2}, and I remember feeling ${animalplural} in my ${bodypart1} whenever I would ${verb2}. You truly were the most ${adj3} thing that ever happened to me. That was until you ${verb3} and ${verb4} me with a ${object} in my ${bodypart2}. I honestly thought that I could ${verb5} through this, but then you ${verb6} my ${noun2} in the heat of the moment while ${verb7}, and that is when I decided I needed to let you go.
            
            I don’t think you are ${adj4} enough to be in a relationship, and I honestly cannot see this situation getting ${adj5} anytime soon. I truly hope you ${verb8}, and realize that everything you did was ${adj6}. I wish you the best and I will forever remember you as my ${adj7} ${noun3}.
            
            With ${noun4}, ${name2}.`
            
            document.querySelector('#name1').value = "";
            document.querySelector('#noun1').value = "";
            document.querySelector('#verb1').value = "";
            document.querySelector('#adj1').value = "";
            document.querySelector('#momentintime').value = "";
            document.querySelector('#adj2').value = "";
            document.querySelector('#animalplural').value = "";
            document.querySelector('#bodypart1').value = "";
            document.querySelector('#verb2').value = "";
            document.querySelector('#adj3').value = "";
            document.querySelector('#verb3').value = "";
            document.querySelector('#verb4').value = "";
            document.querySelector('#object').value = "";
            document.querySelector('#bodypart2').value = "";
            document.querySelector('#verb5').value = "";
            document.querySelector('#verb6').value = "";
            document.querySelector('#noun2').value = "";
            document.querySelector('#verb7').value = "";
            document.querySelector('#adj4').value = "";
            document.querySelector('#adj5').value = "";
            document.querySelector('#verb8').value = "";
            document.querySelector('#adj6').value = "";
            document.querySelector('#adj7').value = "";
            document.querySelector('#noun3').value = "";
            document.querySelector('#noun4').value = "";
            document.querySelector('#name2').value = "";


        if(name1 && noun1 && verb1 && adj1 && momentintime && adj2 && animalplural && bodypart1 && verb2 && adj3 && verb3 && verb4 && object && bodypart2 && verb5 && verb6 && noun2 && verb7 && adj4 && adj5 && verb8 && adj6 && adj7 && noun3 && noun4 && name2){
            myText = `<p>Dear ${name1},</p>

            <p>I am writing this letter because I don’t have the ${noun1} to tell you this in person. I have been ${verb1} about doing this this for a while, and I honestly think it is the ${adj1} decision for the both of us.</p>
            
            <p>I think we should break up. I feel like the ${momentintime} of our relationship was ${adj2}, and I remember feeling ${animalplural} in my ${bodypart1} whenever I would ${verb2}. You truly were the most ${adj3} thing that ever happened to me. That was until you ${verb3} and ${verb4} me with a ${object} in my ${bodypart2}. I honestly thought that I could ${verb5} through this, but then you ${verb6} my ${noun2} in the heat of the moment while ${verb7}, and that is when I decided I needed to let you go.</p>
            
            <p>I don’t think you are ${adj4} enough to be in a relationship, and I honestly cannot see this situation getting ${adj5} anytime soon. I truly hope you ${verb8}, and realize that everything you did was ${adj6}. I wish you the best and I will forever remember you as my ${adj7} ${noun3}.</p>
            
            <p>With ${noun4}, ${name2}.</p>`;

        }else{
            myText = "give me words!!!"
        }

        myMadlib.innerHTML= myText;
        //my madlib is what will show as overlay i think
    }

    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('#overlay').className = "hidden";
        }
    });

})();