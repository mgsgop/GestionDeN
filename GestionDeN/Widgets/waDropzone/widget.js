WAF.define('waDropzone', function() {
    var widget = WAF.require('waf-core/widget');

    var waDropzone = widget.create('waDropzone');

    var dz;

	waDropzone.prototype.countElement = function(element)
	{
		var c = 0;
		this.files.forEach(function(e)
		{
			if(element.name == e.name)
			{
				c++;
			}
		})
		
		return c;
	}
    waDropzone.prototype.init = function() {
        try {
            var that = this;
            $('#' + this.id).addClass('dropzone');
            dz = new Dropzone("#" + this.id, {
                url: "/waUpload/upload",
                paramName: "filesToUpload",
                parallelUploads: this.options.paralleluploads == null ? 1 : this.options.paralleluploads,
                maxFilesize: this.options.maxfilesize == null ? 1 : this.options.maxfilesize,
                uploadMultiple: this.options.uploadmultiple == "true" ? true : false,
                addRemoveLinks: this.options.addremovelinks == "true" ? true : false,
                createImageThumbnails: this.options.createimagethumbnails == "true" ? true : false,
                maxFiles: this.options.maxfiles == null ? 2 : this.options.maxfiles,
                autoProcessQueue: false
            });
            var conflict = this.options.iffileexist;
            var r = false;
            var folder = this.options.uploadfolder == null ? "/tmp" : this.options.uploadfolder
			
            dz.on('sending', function(file, xhr, formData) {

                formData.append("config", JSON.stringify({
                    folder: folder,
                    replace: r
                }));
                that.fire('sending', {
                    file: file,
                    xhr: xhr,
                    form: formData
                });

            });

            dz.on('addedfile', function(file) {

                if (conflict === 'Replace') {
                    r = true;
                }
                else if (conflict === 'Alert User') {
                    //verify the file
                    $.ajax({
                        type: 'POST',
                        url: '/waUpload/verify',
                        data: {
                            filesInfo: JSON.stringify({
                                "folder": folder,
                                "files": [{
                                    name: file.name,
                                    type: file.type,
                                    size: file.size
                                }]
                            })
                        }
                    }).done(function(data) {
                        var json = JSON.parse(data);
                        if (json.conflicts.length != 0) {

                            var box = $("<div class='waf-dialog-container' id='dz-modal'>" + json.conflictMessage + "</div>");
                            box.dialog({
                                autoOpen: false,
                                title: "Please select an option",
                                buttons: [{
                                    "text": "Cancel",
                                    click: function(ev) {
                                        $(this).dialog('close');
                                    }
                                },{
                                    "text": "Rename",
                                    click: function(ev) {
                                        r = false;
                                        that.processFiles([file]);
                                        
                                        $(this).dialog('close');
                                    }
                                },{
                                    "text": "Replace",
                                    click: function(ev) {
                                        r = true;
                                        
                                        var list = that.getAcceptedFiles();
                                       	 if(that.countElement(file) > 1)
                                        {
                                        	that.removeFile(file)
                                        }
                                        that.processFiles([file]);
                                        
                                        $(this).dialog('close');
                                    }
                                }]
                            });

                            box.dialog("open");
							
                        }
                        else{
                        	that.processFiles([file])
                        }
                    })
                }


                that.fire('addedfile', {
                    file: file
                });
            })

            dz.on('removedfile', function(file) {
                that.fire('removedfile', {
                    file: file
                });
            })

            dz.on('error', function(file, errorMessage, xhr) {
                that.fire('error', {
                    file: file,
                    errorMessage: errorMessage,
                    xhr: xhr
                });
            })

            dz.on('processing', function(file) {
                that.fire('processing', {
                    file: file
                });
            })

            dz.on('uploadprogress', function(file, progress, byteSent) {
                that.fire('uploadprogress', {
                    file: file,
                    progress: progress,
                    byteSent: byteSent
                });
            })

            dz.on('success', function(file, response) {
                that.fire('success', {
                    file: file,
                    serverResponse: response
                });
            })

            dz.on('complete', function(file) {
                that.fire('complete', {
                    file: file
                });
            })

            dz.on('canceled', function(file) {
                that.fire('canceled', {
                    file: file
                });
            })

            dz.on('maxfilesreached', function(file) {
                that.fire('maxfilesreached', {
                    file: file
                });
            })

            dz.on('maxfilesexceeded', function(file) {
                that.fire('maxfilesexceeded', {
                    file: file
                });
            })

            this.files = dz.files;
            
            this.getAcceptedFiles 	= function()
	        {
	        	return dz.getAcceptedFiles();
	        };
            this.getRejectedFiles	= function()
	        {
	        	return dz.getRejectedFiles();
	        };
            this.getQueuedFiles		= function()
	        {
	        	return dz.getQueuedFiles();
	        };
            this.getUploadingFiles	= function()
	        {
	        	return dz.getUploadingFiles();
	        };
            this.disable			= function()
	        {
	        	return dz.disable();
	        };;
	        this.enable				= function()
	        {
	        	return dz.enable();
	        };
	        this.addFile			= function(file)
	        {
	        	return dz.addFile(file);
	        };
	        this.enqueueFiles		= function(files)
	        {
	        	return dz.enqueueFiles(files);
	        };;
	        this.enqueueFile		= function(file)
	        {
	        	return dz.enqueueFile(file);
	        };
	        this.addDirectory		= function(entry, path)
	        {
	        	return dz.addDirectory(entry, path);
	        };
	        this.removeFile			= function(file)
	        {
	        	return dz.removeFile(file);
	        };
	        this.removeAllFiles		= function(cancelIfNecessary)
	        {
	        	return dz.removeAllFiles(cancelIfNecessary);
	        }
	        this.processQueue		= function()
	        {
	        	return dz.processQueue();
	        }
	        this.processFiles		= function(files)
	        {
	        	return dz.processFiles(files);
	        }
	        this.cancelUpload		= function(file)
	        {
	        	return dz.cancelUpload(file);
	        };
	        this.uploadFiles		= function(files){
	        	return dz.uploadFiles(files);
	        };

        }
        catch (e) {
            console.log(e.message);
        }
    };
        
    
    return waDropzone;
});

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html