#target photoshop

//Open the image file that contains the 4 Nishika Frames


//





var doc;
var newApp = app;
doc = newApp.documents.add(1000,1000,10,"test",NewDocumentMode.RGB);


function CreateGuides(doc){
//Create 3 guides at 25%, 50%, 75% width of the passed doc document
    
    var quarter = doc.width/4
    
    for(var i = 1; i<4;i++) {
            doc.guides.add(Direction.VERTICAL,  i*quarter);
    }
    
    };
 mm
CreateGuides(doc);
//~ function test(msg) {
//~     
//~         Window.prompt("here is the message: " + msg);
//~     };

//~ test("hello");


//Create Splices from the guides

//Export each splice as a jpeg at 100 quality, ask user for folder path, store images within [path]/images

//Open the 4 images in a new photoshop document

//Pause Program -- ask user to overlay the images

//Resume Program on user's input

//