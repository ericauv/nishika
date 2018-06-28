#target photoshop

//Open the image file that contains the 4 Nishika Frames

//Create Selection out of first quarter of image


//

var doc;
var docForOverlay;

//the 4 frame image file
var imageFile;
imageFile = new File(File.saveDialog("Select the file that contains the 4 frame image"));

//~ doc = app.documents.add("1000px","1000px",300,"test",NewDocumentMode.RGB);

 doc = app.open (imageFile);

    //User select folder for this roll of Nishika shots
    var folderPath = Folder.selectDialog ("Select the folder for this roll of Nishika") + "/";
    alert(folderPath);


ExportFrames(true);
function ExportFrames(Horizontal){

    docForOverlay = app.documents.add("1000px","1000px",300,"test",NewDocumentMode.RGB);

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
        
        //Create a vertical or horizontal slice
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
       
            //Store size of current slice
            newWidth = right-left;
            newHeight = bot-top;

            //Create rectangle coordinates that will be used for selection of current slice
            shapeRef = [[left,top],[left,bot],[right,bot],[right,top]];
            
            //Export the current slice
            ExportSelection(app,doc,shapeRef,i);
            
            function ExportSelection(app,doc,shapeRef,i){
            //creates selection from passed coordinate array
            //saves selection as JPEG with file name 'img_0' + i
                
                var sel;
                
                //Folder that holds the individual exported frame files
                var imgFolder;
                imgFolder = Folder(folderPath + "images");
                
                 var framePath;
                
                app.activeDocument = doc;
                
                //make the selection shapeRef
                doc.selection.select(shapeRef);
              
                //store selection to sel
                var sel = doc.selection;
                
//~                 //FIll Colour selection [for testing only, to be deleted]    
//~                 var newColor = new SolidColor;
//~                 newColor.rgb.red = i*25;
//~                 newColor.rgb.green = i*25;
//~                 newColor.rgb.blue = i*25;
//~                 sel.fill(newColor);
                
                //Copy current selection
                sel.copy();
                
                //Paste selection to new document
                docNew = app.documents.add(newWidth,newHeight,300,"img_0" +i,NewDocumentMode.RGB);
                docNew.paste();
                
                //Set up export options
                var opt = new ExportOptionsSaveForWeb;
                opt.includeProfile = true;
                opt.format =SaveDocumentType.JPEG;
                opt.quality=100;          
                
                //Export new document

                //If this is the first slice being exported for this image, create 'images' sub-folder
                if (i==1){

                    if(!imgFolder.exists) imgFolder.create();
                    };

                
                //Store the path of the frame to be exported
                framePath = imgFolder.fsName +"/img_0"+i+".jpg";
                docNew.exportDocument (new File(imgFolder.fsName +"/img_0"+i+".jpg"), ExportType.SAVEFORWEB, opt);
                
                app.activeDocument = docForOverlay;
                
                docNew.close(SaveOptions.DONOTSAVECHANGES);
                
                var sourceFile= new File(framePath);
                var idPlc = charIDToTypeID( "Plc " );
                var desc3 = new ActionDescriptor();
                var idnull = charIDToTypeID( "null" );
                desc3.putPath( idnull, sourceFile);
                var idFTcs = charIDToTypeID( "FTcs" );
                var idQCSt = charIDToTypeID( "QCSt" );
                var idQcsa = charIDToTypeID( "Qcsa" );
                desc3.putEnumerated( idFTcs, idQCSt, idQcsa );
                executeAction( idPlc, desc3, DialogModes.NO );
                
                var backLayer = docForOverlay.layers.getByName("Background");
                
                
                if(backLayer != null){
                        backLayer.allLocked=false;
                        backLayer.remove;
                    };
            };
        };
  };


//Create Splices from the guides

//Export each splice as a jpeg at 100 quality, ask user for folder path, store images within [path]/images

//Open the 4 images in a new photoshop document

//Pause Program -- ask user to overlay the images

//Resume Program on user's input

//