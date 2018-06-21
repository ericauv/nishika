#target photoshop

//Open the image file that contains the 4 Nishika Frames

//Create Selection out of first quarter of image


//

var doc;
var newApp = app;

doc = newApp.documents.add("1000px","1000px",300,"test",NewDocumentMode.RGB);

ExportFrames(true);
function ExportFrames(Horizontal){

    var widthFrame = doc.width/4;
    var heightFrame = doc.height/4;

    var widthDoc = doc.width;
    var heightDoc = doc.height;
    
    var newWidth;
    var newHeight;
    
    var left;
    var right;
    var top;
    var bot;
    
    var shapeRef;
    
    for(i=1;i<=4;i++){
        switch(Horizontal){
            
            case true:
                left = (i-1)*widthFrame;
                right=i*widthFrame;
                top = 0;
                bot = heightDoc;
                
                break;
            case false:
                left = 0;
                right = widthDoc;
                top = (i-1)*heightFrame;
                bot=i*heightFrame;
                
                break;
           };
       
            newWidth = right-left;
            newHeight = bot-top;
            
            

            //Create rectangle coordinates that will be used as selection
            shapeRef = [[left,top],[left,bot],[right,bot],[right,top]];
            
            ExportSelection(newApp,doc,shapeRef,i);
            
            function ExportSelection(newApp,doc,shapeRef,i){
            //creates selection from passed coordinate array
            //saves selection as JPEG with file name 'img_0' + i
                
                var sel;
                
                var opt = new ExportOptionsSaveForWeb;
                opt.includeProfile = true;
                opt.format =SaveDocumentType.JPEG;
                opt.quality=100;
                
                                
                                
                //make the selection shapeRef
                doc.selection.select(shapeRef);
              
                //store selection to sel
                var sel = doc.selection;
                var newColor = new SolidColor;

                newColor.rgb.red = i*25;
                newColor.rgb.green = i*25;
                newColor.rgb.blue = i*25;
                sel.fill(newColor);
                
                sel.copy();
                docNew = newApp.documents.add(newWidth,newHeight,300,"img_0" +i,NewDocumentMode.RGB);
                docNew.paste();
                docNew.exportDocument (new File("C:/test/"+docNew.name+".jpg"), ExportType.SAVEFORWEB, opt);
//~                 docNew.saveAs (docNew.path, opt);
                docNew.close(SaveOptions.DONOTSAVECHANGES);
            };
        };
  };
//~ sel.fill (fillType, mode, opacity, preserveTransparency);


//~ function CreateGuides(doc){
//~ //Create 3 guides at 25%, 50%, 75% width of the passed doc document
//~     
//~     for(var i=1; i<4;i++){

//~         doc.selection.resize(w,h,
//~      

//~     }    
//~     
//~     for(var i = 1; i<4;i++) {
//~             doc.guides.add(Direction.VERTICAL,  i*quarter);
//~     }
//~     
//~     };
//~  mm
//~ CreateGuides(doc);
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