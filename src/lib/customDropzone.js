import { Dropzone } from "dropzone";

Dropzone.options.image = {
    dictDefaultMessage: "Please load the selected images",
    acceptedFiles: ".png, .jpg, .jpeg, .bmp, .svg",
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    headers: {},
    paramName: "image",
    init: function () {
        const Dropzone = this;
        const btnPublish = document.querySelector("#publish");
        btnPublish.addEventListener("click", function () {
            Dropzone.processQueue();
        });
        Dropzone.on("queuecomplete", function () {
            if (Dropzone.getActiveFiles().length == 0) {
                window.location.href = "/home";
            }
        });
    },
};
