/* =====================================================
   D.E.N.S.O CORTEX AGENT
   PAGE 1 - INPUT / ANALYSIS
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const documentTitle =
    document.getElementById("documentTitle");

const requestContent =
    document.getElementById("requestContent");

const charCount =
    document.getElementById("charCount");

const typeButtons =
    document.querySelectorAll(".type-button");

const dropZone =
    document.getElementById("dropZone");

const fileInput =
    document.getElementById("fileInput");

const chooseFileButton =
    document.getElementById("chooseFileButton");

const selectedFile =
    document.getElementById("selectedFile");

const fileName =
    document.getElementById("fileName");

const fileSize =
    document.getElementById("fileSize");

const removeFile =
    document.getElementById("removeFile");

const startAnalysis =
    document.getElementById("startAnalysis");

const analysisOverlay =
    document.getElementById("analysisOverlay");

const progressBar =
    document.getElementById("progressBar");

const analysisText =
    document.getElementById("analysisText");


/* =====================================================
   REQUEST TYPE
===================================================== */

typeButtons.forEach(button => {

    button.addEventListener("click", function () {

        typeButtons.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


/* =====================================================
   CHARACTER COUNT
===================================================== */

requestContent.addEventListener("input", function () {

    charCount.textContent = this.value.length;

});


/* =====================================================
   OPEN FILE
===================================================== */

chooseFileButton.addEventListener("click", function (event) {

    event.stopPropagation();

    fileInput.click();

});


dropZone.addEventListener("click", function () {

    fileInput.click();

});


/* =====================================================
   FILE INPUT
===================================================== */

fileInput.addEventListener("change", function () {

    if (this.files.length > 0) {

        handleFile(this.files[0]);

    }

});


/* =====================================================
   HANDLE FILE
===================================================== */

function handleFile(file) {

    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg"
    ];

    const maxSize =
        20 * 1024 * 1024;


    /* Check size */

    if (file.size > maxSize) {

        alert(
            "Tệp quá lớn. Vui lòng chọn tệp có dung lượng tối đa 20MB."
        );

        return;

    }


    /* Check extension */

    const extension =
        file.name.split(".").pop().toLowerCase();

    const allowedExtensions = [
        "pdf",
        "doc",
        "docx",
        "png",
        "jpg",
        "jpeg"
    ];

    if (!allowedExtensions.includes(extension)) {

        alert(
            "Định dạng tệp không được hỗ trợ."
        );

        return;

    }


    /* Display file */

    fileName.textContent =
        file.name;

    fileSize.textContent =
        formatFileSize(file.size);

    selectedFile.classList.add("has-file");

}


/* =====================================================
   FORMAT FILE SIZE
===================================================== */

function formatFileSize(bytes) {

    if (bytes === 0) {

        return "0 Bytes";

    }

    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];

    const index =
        Math.floor(
            Math.log(bytes) / Math.log(1024)
        );

    return (
        parseFloat(
            (bytes / Math.pow(1024, index)).toFixed(2)
        )
        + " "
        + units[index]
    );

}


/* =====================================================
   REMOVE FILE
===================================================== */

removeFile.addEventListener("click", function (event) {

    event.stopPropagation();

    fileInput.value = "";

    fileName.textContent =
        "Chưa có tài liệu được chọn";

    fileSize.textContent = "";

    selectedFile.classList.remove("has-file");

});


/* =====================================================
   DRAG & DROP
===================================================== */

[
    "dragenter",
    "dragover"
].forEach(eventName => {

    dropZone.addEventListener(
        eventName,
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            dropZone.classList.add("dragging");

        }
    );

});


[
    "dragleave",
    "drop"
].forEach(eventName => {

    dropZone.addEventListener(
        eventName,
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            dropZone.classList.remove("dragging");

        }
    );

});


dropZone.addEventListener("drop", function (event) {

    const files =
        event.dataTransfer.files;

    if (files.length > 0) {

        handleFile(files[0]);

    }

});


/* =====================================================
   START AI ANALYSIS
===================================================== */

startAnalysis.addEventListener("click", function () {


    /* Check title */

    if (
        documentTitle.value.trim() === ""
    ) {

        alert(
            "Vui lòng nhập tiêu đề tài liệu / báo cáo."
        );

        documentTitle.focus();

        return;

    }


    /* Check request */

    if (
        requestContent.value.trim() === ""
    ) {

        alert(
            "Vui lòng nhập nội dung hoặc yêu cầu phân tích."
        );

        requestContent.focus();

        return;

    }


    /* Show loading */

    analysisOverlay.classList.add("show");

    progressBar.style.width = "0%";


    runAnalysisAnimation();

});


/* =====================================================
   ANALYSIS ANIMATION
===================================================== */

function runAnalysisAnimation() {

    const steps = [

        {
            percent: 20,
            text: "Đang tiếp nhận tài liệu...",
            step: "analysisStep1"
        },

        {
            percent: 45,
            text: "Đang phân tích nội dung tài liệu...",
            step: "analysisStep2"
        },

        {
            percent: 70,
            text: "Đang xây dựng Knowledge Graph...",
            step: "analysisStep3"
        },

        {
            percent: 90,
            text: "Đang chuẩn bị dữ liệu cho AI Agent...",
            step: "analysisStep4"
        }

    ];


    let currentStep = 0;


    function nextStep() {

        if (currentStep >= steps.length) {

            progressBar.style.width = "100%";

            analysisText.textContent =
                "Phân tích hoàn tất. Đang chuyển sang không gian làm việc...";


            setTimeout(() => {

                /*
                 * Chuyển sang page2
                 */

                window.location.href =
                    "page2.html";

            }, 1000);

            return;

        }


        const step =
            steps[currentStep];


        progressBar.style.width =
            step.percent + "%";


        analysisText.textContent =
            step.text;


        updateAnalysisSteps(
            currentStep
        );


        currentStep++;


        setTimeout(
            nextStep,
            1100
        );

    }


    nextStep();

}


/* =====================================================
   UPDATE ANALYSIS STEPS
===================================================== */

function updateAnalysisSteps(currentIndex) {

    const stepIds = [
        "analysisStep1",
        "analysisStep2",
        "analysisStep3",
        "analysisStep4"
    ];


    stepIds.forEach(
        (id, index) => {

            const element =
                document.getElementById(id);

            const icon =
                element.querySelector("i");


            if (index < currentIndex) {

                element.classList.remove("active");

                element.classList.add("done");

                icon.className =
                    "fa-solid fa-circle-check";

            }

            else if (index === currentIndex) {

                element.classList.add("active");

                element.classList.remove("done");

                icon.className =
                    "fa-solid fa-spinner fa-spin";

            }

            else {

                element.classList.remove(
                    "active",
                    "done"
                );

                icon.className =
                    "fa-regular fa-circle";

            }

        }
    );

}


/* =====================================================
   PREVENT FORM SUBMIT / ENTER
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            event.target.tagName !== "TEXTAREA"
        ) {

            event.preventDefault();

        }

    }
);