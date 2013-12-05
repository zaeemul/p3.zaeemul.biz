// JavaScript Document
//changing the chunxt message in blank format
var count = 0;
var tweetMessages;
var sections = new Array(); //store the section of multiple chunxts
//chunxt generation
function chunks(inText, toText, is_web_formatting)
{
    //if there is web formatting
    if(is_web_formatting)
    {
        remove_formatting(inText);
    }
        var maxChars=137;
        var fromTweet=inText;
        fromTweet=Trim(fromTweet.value);
        var isPunctuation = false;
        var isCount = true;
        //specify the size of chunk
        if (document.myForm.maxCharSelect[2].checked){
            maxChars=Int(Val(document.myForm.charLimit.value));
            if(maxChars < 30){
                maxChars=30;
                document.myForm.charLimit.value="30";
            }
        }
        else if(document.myForm.maxCharSelect[0].checked){
            maxChars=Val(document.myForm.maxCharSelect[0].value);
        }
        else{
            maxChars=Val(document.myForm.maxCharSelect[1].value);
        }
        //set isPunctuation true or false
        if(document.myForm.chunxtBreak[1].checked)
        {
            isPunctuation = true;
        }
        //set count
        count=0;
        var tweetCount=count + 1;
        var x=fromTweet.length / maxChars;
        var mMax=Int(x) + 1;
        var z=Str(mMax);
        var tweetMax=maxChars - z.length - 7;
        var tweetWord=new Array();
        tweetMessages=new Array();
        tweetMessages[count]="";
        //if random break is selected
        if(!isPunctuation)
        {
            tweetWord=fromTweet.split(' ');
            for(var i=0; i < tweetWord.length; i++)
            {
                x=tweetMessages[count].length + tweetWord[i].length + Str(count).length;
                if(x < tweetMax)
                {
                    tweetMessages[count]=tweetMessages[count] + tweetWord[i] + " ";
                }
                else
                {
                    tweetMessages[count]= (tweetMessages[count]  +(isCount ? " "+ tweetCount + "/" + mMax : "")).replace(/^\s+|\s+$/g,'');
                    count++;
                    tweetCount=count + 1;
                    tweetMessages[count]=tweetWord[i] + " ";
                }
            }
        }
        else
        {

            tweetWord= fromTweet.split(/([\;\.\,\?!\??\:]+|https?:\/\/\S+)/g);
            for(var i=0; i < tweetWord.length; i++)
            {
                x=tweetMessages[count].length + tweetWord[i].length + Str(count).length;
                if(x < tweetMax)
                {
                    if(tweetWord[i].length != 0)
                    {
                        tweetMessages[count]=tweetMessages[count] + tweetWord[i];
                    }
                }
                else
                {
                    tweetMessages[count]= (tweetMessages[count]  +(isCount ? " "+ tweetCount + "/" + mMax : "")).replace(/^\s+|\s+$/g,'');
                    count++;
                    tweetCount=count + 1;
                    tweetMessages[count]=tweetWord[i];
                }
            }
        }
        tweetMessages[count] = (tweetMessages[count]  + (isCount ? " "+ tweetCount + "/" + mMax : "")).replace(/^\s+|\s+$/g,'');
        if(count + 1 != mMax && isCount)
        {
            for(var i=0; i <= count; i++)
            {
                tweetMessages[i]=tweetMessages[i].replace("/" + mMax, "/" + (count + 1));
            }
        }

        fromTweet="";
        for(var i=0; i < count; i++)
        {
            fromTweet=fromTweet + tweetMessages[i] + Chr(13) + Chr(13);
        }
        fromTweet=fromTweet + tweetMessages[count];
        toText.value=fromTweet;
    return false;
}
/************* Customized functions ******************************/
function selctionChange()
{
    if (document.myForm.maxCharSelect[0].checked)
    {
        if(document.myForm.myMessage.value == "Paste your text here to break up into 160 character facebook status..."
            || document.myForm.myMessage.value == "Paste your text here to break up into "+document.myForm.charLimit.value+" character chunks..." ||
            document.myForm.myMessage.value == "Paste your text here with specified section tags to generate mutliple size chunxts...")
        {
            $("#multi-info").hide(2000);
            isMultiple = false;
            document.myForm.myMessage.value = "Paste your text here to break up into 140 character tweets...";
        }
    }
    else if (document.myForm.maxCharSelect[1].checked)
    {
        if(document.myForm.myMessage.value == "Paste your text here to break up into 140 character tweets..."
            || document.myForm.myMessage.value == "Paste your text here to break up into "+document.myForm.charLimit.value+" character chunks..." ||
            document.myForm.myMessage.value == "Paste your text here with specified section tags to generate mutliple size chunxts...")
        {
            $("#multi-info").hide(2000);
            isMultiple = false;
            document.myForm.myMessage.value = "Paste your text here to break up into 160 character facebook status...";
        }
    }
    else if (document.myForm.maxCharSelect[2].checked)
    {
        if(document.myForm.myMessage.value == "Paste your text here to break up into 160 character facebook status..."
            || document.myForm.myMessage.value == "Paste your text here to break up into 140 character tweets..." ||
            document.myForm.myMessage.value == "Paste your text here with specified section tags to generate mutliple size chunxts...")
        {
            $("#multi-info").hide(2000);
            isMultiple = false;
            document.myForm.myMessage.value = "Paste your text here to break up into "+document.myForm.charLimit.value+" character chunks...";
        }
    }
    else if (document.myForm.maxCharSelect[3].checked)
    {
        if(document.myForm.myMessage.value == "Paste your text here to break up into 160 character facebook status..."
            || document.myForm.myMessage.value == "Paste your text here to break up into 140 character tweets..." ||
            document.myForm.myMessage.value == "Paste your text here to break up into "+document.myForm.charLimit.value+" character chunks...")
        {
            $("#multi-info").show(2000);
            isMultiple = true;
            document.myForm.myMessage.value = "Paste your text here with specified section tags to generate mutliple size chunxts...";
        }
    }
    chunks(document.myForm.myMessage, document.myForm.packets, false);
}

//remove web formatting from original text
function remove_formatting(inText)
{
    $.ajax({
        type: "POST",
        url: "_server/web_unformatting.php",
        data: 'str='+inText.value,
        success: function(msg)
        {
            inText.value = msg;
            chunks(document.myForm.myMessage, document.myForm.packets, false);
        }
    });
}

//change text of original text on focus/blur
function changeText()
{
    var msg = document.myForm.myMessage;
    if( msg.value == "Paste your text here to break up into 160 character facebook status..." ||
        msg.value == "Paste your text here to break up into 140 character tweets..." ||
        msg.value == "Paste your text here to break up into "+document.myForm.charLimit.value+" character chunks..." ||
        msg.value == "Paste your text here with specified section tags to generate mutliple size chunxts...")
    {
        msg.value = "";
    }
    else if(msg.value == "")
    {
        if (document.myForm.maxCharSelect[0].checked)
        {
            msg.value = "Paste your text here to break up into 140 character tweets...";
        }
        else if (document.myForm.maxCharSelect[1].checked)
        {
            msg.value = "Paste your text here to break up into 160 character facebook status...";
        }
        else if (document.myForm.maxCharSelect[2].checked)
        {
            msg.value = "Paste your text here to break up into "+document.myForm.charLimit.value+" character chunks...";
        }
        else if (document.myForm.maxCharSelect[3].checked)
        {
            msg.value = "Paste your text here with specified section tags to generate mutliple size chunxts...";
        }
    }
}

/**************** Helper Functions **************************/
function Int(StringorNum)
{
    return Math.floor(StringorNum);
}

function Val(String)
{
    return String - 0;
}

function Str(Number)
{
    return "" + Number;
}

function Asc(String)
{
    return String.charCodeAt(0);
}

function Chr(AsciiNum)
{
    return String.fromCharCode(AsciiNum)
}


function Trim(s) {
    var i=0;
    while (i < s.length - 1  && s.substr(i,1)  ==  " ")
    {
        i++;
    }
    if(i>0){
        s=s.slice(i,s.length);
    }

    i=s.length - 1;
    while (i>0 && s.substr(i,1)  ==  " ")
    {
        i--;
    }
    if(i < s.length - 1){
        s=s.slice(0,i + 1);
    }
    return s;
}
