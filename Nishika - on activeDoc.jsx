#target photoshop

//Make execution accelerated
SpeedExecution ();

var doc;
var docForOverlay;

//Make doc the active document
doc = app.activeDocument;

//User select folder for this roll of Nishika shots
var folderPath = Folder.selectDialog ("Select the folder for this roll of Nishika") + "/";

//Export the frames to individual images and open them in a new document, save the new document
ExportFrames(folderPath);

function ExportFrames(folderPath){
    
    //Ask user to input the file name for this image
    var exportName = prompt ("Input the base name of the folder/photoshop file/exported gif", "New Nishika File", "File Name");
    
    //Create folder for this image
    var fileFolder;
    fileFolder = Folder(folderPath + exportName);
    if (!fileFolder.exists){
        fileFolder.create();
    };
    
    //Create new photoshop document, name it with user's input
    docForOverlay = app.documents.add("1000px","1000px",300,exportName,NewDocumentMode.RGB);

    //Used to create dimensions of the slices
    var widthFrame = doc.width/4;
    var heightFrame = doc.height/4;

    //Document properties
    var widthDoc = doc.width;
    var heightDoc = doc.height;
    
    //Slice dimensions
    var newWidth;
    var newHeight;
    
    //Slice position properties
    var left;
    var right;
    var top;
    var bot;
    
    var shapeRef;
    
    //Determine whether the source image is landscape or portrait (true=landscape)
    var isHorizontal = widthDoc / heightDoc > 1
      
    for(i=1;i<=4;i++){
        
        //Create a vertical or horizontal slice
        switch(isHorizontal){
            
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
            
            ExportSelection(app,doc,shapeRef,i);
            //Export the current slice
            
            function ExportSelection(app,doc,shapeRef,i){
            //creates selection from passed coordinate array
            //saves selection as JPEG with file name 'img_0' + i
                
                //selection
                var sel;
            
                //Folder that holds the individual exported frame files
                var imgFolder;
                imgFolder = Folder(fileFolder + "/images");
                
                //file path for the individual image slices
                 var framePath;
                
                app.activeDocument = doc;
                
                //make the selection shapeRef
                doc.selection.select(shapeRef);
              
                //store selection to sel
                var sel = doc.selection;
                
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

                //If this is the first slice being exported for this image, create 'images' sub-folder
                if (i==1){

                    if(!imgFolder.exists) imgFolder.create();
                 };
             
                //Store the path of the frame to be exported
                framePath = imgFolder.fsName +"/img_0"+i+".jpg";
                
                //Export current frame as a jpeg
                docNew.exportDocument (new File(imgFolder.fsName +"/img_0"+i+".jpg"), ExportType.SAVEFORWEB, opt);
                
                //Make the main document the one that is active (so that docNew can be closed)
                app.activeDocument = docForOverlay;
                
                //Close the file that was used to save the image slice
                docNew.close(SaveOptions.DONOTSAVECHANGES);
                
                //Open the saved image slice in the docForOverlay
                OpenInActiveDoc (framePath);
                
                //Delete the background layer
                var backLayer = LayerExists (docForOverlay, "Background");       
                if(backLayer != null){
                        backLayer.allLocked=false;
                        backLayer.remove();
                    };
            };
        };
    
    //Save the photoshop file with the 4 frames as layers
    SavePSD (File(fileFolder + "/" + exportName + ".psd"), docForOverlay);
    
    //Order the layers img_01 - > img_04
    OrderLayers(docForOverlay);
    
    //Set opacity and lock img_01 layer
    SetUpRefLayer(docForOverlay,'img_01');
    
    //Close the original 4 frame file
    doc.close(SaveOptions.DONOTSAVECHANGES);
  };


function OrderLayers(docForOverlay){
    //Puts layers in order of img_01,img_02,img03,img_04
        var currLayer;
        
            
        //Loop through layers backwards
        for(i=1;i<=4;i++){
                
                //Set currLayer to be img_0 + i layer
                currLayer = LayerExists(docForOverlay,"img_0"+i);
                
                if(i!=1){
                    //Bring current lafter the layer whose number is one less                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                    currLayer.move(LayerExists(docForOverlay, "img_0" + (i-1)),ElementPlacement.PLACEAFTER);
                    
                }else{
                    //Bring img_01 layer before img_02 layer
                    currLayer.move(LayerExists(docForOverlay,"img_04"),ElementPlacement.PLACEBEFORE);
                }
                
            }
    };
function SetUpRefLayer(docForOverlay,layerName){
//~     Sets up the layer with the passed layer name within the passed docForOverlay to have the following properties:
//~     - Opacity = 75%
//~     - Locked
            
            //ensure that layer exists and set refLayer to it
            const refLayer = LayerExists(docForOverlay,layerName);
            
            //Set opacity of refLayer to 75% and lock it, if it existed
            if(refLayer != null){
                    refLayer.opacity = 75;
                    refLayer.allLocked = true;
                }
        
    }
function LayerExists(docTest, layerName){
    //Tests if layer with passed layerName exists in docTest, returns the layer if true, returns null if false
        try{var testForLayer= docTest.layers.getByName(layerName)}
        finally{
                return testForLayer;
            }
    };

function OpenInActiveDoc(openPath){
    //Opens the file with passed openPath in the active document as a new layer
                 var sourceFile= new File(openPath);
                var idPlc = charIDToTypeID( "Plc " );
                var desc3 = new ActionDescriptor();
                var idnull = charIDToTypeID( "null" );
                desc3.putPath( idnull, sourceFile);
                var idFTcs = charIDToTypeID( "FTcs" );
                var idQCSt = charIDToTypeID( "QCSt" );
                var idQcsa = charIDToTypeID( "Qcsa" );
                desc3.putEnumerated( idFTcs, idQCSt, idQcsa );
                executeAction( idPlc, desc3, DialogModes.NO );
};

function SpeedExecution(){
 
cTID = function(s) { return app.charIDToTypeID(s); };  
sTID = function(s) { return app.stringIDToTypeID(s); };  
  
Stdlib = function Stdlib() {};  
  
Stdlib.setActionPlaybackOptions = function(opt, arg) {  
  function _ftn() {  
    var desc = new ActionDescriptor();  
    var ref = new ActionReference();  
    ref.putProperty(cTID("Prpr"), cTID("PbkO"));  
    ref.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));  
    desc.putReference(cTID("null"), ref );  
    var pdesc = new ActionDescriptor();  
    pdesc.putEnumerated(sTID("performance"), sTID("performance"), sTID(opt));  
    if (opt == "pause" && arg != undefined) {  
      pdesc.putInteger(sTID("pause"), parseInt(arg));  
    }  
    desc.putObject(cTID("T "), cTID("PbkO"), pdesc );  
    executeAction(cTID("setd"), desc, DialogModes.NO);  
  }  
  _ftn();  
};  
Stdlib.setPlaybackAcclerated = function() {  
  Stdlib.setActionPlaybackOptions("accelerated");  
};  
Stdlib.setPlaybackStepByStep = function() {  
  Stdlib.setActionPlaybackOptions("stepByStep");  
};  
Stdlib.setPlaybackPaused = function(delaySec) {  
  Stdlib.setActionPlaybackOptions("pause", delaySec);  
};   
 };

function SavePSD(savePath, docForSave){
    //Saves the passed docForSave to the passed savePath
  var psdFile = new File(savePath);
  psdSaveOptions = new PhotoshopSaveOptions();
  psdSaveOptions.embedColorProfile = true;
  psdSaveOptions.alphaChannels = true;  
  activeDocument.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE);
}