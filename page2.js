/* =========================================
   TAB
========================================= */

const tabs = document.querySelectorAll(".tab");

const tabContents = document.querySelectorAll(".tab-content");


function activateTab(tabName) {

    tabs.forEach(tab => {

        tab.classList.toggle(
            "active",
            tab.dataset.tab === tabName
        );

    });


    tabContents.forEach(content => {

        content.classList.toggle(
            "hidden",
            content.id !== tabName
        );

    });

}


tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        activateTab(tab.dataset.tab);

    });

});



/* =========================================
   KNOWLEDGE GRAPH BUTTON
========================================= */

document.querySelectorAll("[data-switch]").forEach(button => {

    button.addEventListener("click", () => {

        activateTab(button.dataset.switch);

    });

});



/* =========================================
   TOAST
========================================= */

const toast = document.getElementById("toast");

let toastTimer;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}



/* =========================================
   SOURCE CLICK
========================================= */

document.querySelectorAll(".source-item").forEach(item => {

    item.addEventListener("click", () => {

        const source = item.dataset.source;

        const page = item.dataset.page;


        showToast(
            `Nguồn: ${source} – Trang ${page}`
        );


        const input =
            document.getElementById("chatInput");


        input.value =
            `Tóm tắt nội dung "${source}" ở trang ${page}`;


        input.focus();

    });

});



/* =========================================
   CHAT
========================================= */

const chatForm =
    document.getElementById("chatForm");


const chatInput =
    document.getElementById("chatInput");


const chatScroll =
    document.getElementById("chatScroll");



/* =========================================
   ANSWER DATA
========================================= */

const answers = [

    {
        keywords: [
            "thông số",
            "specification",
            "áp suất"
        ],

        answer:
            "Theo phần Appendix A – Specification (trang 32), cần kiểm tra dải áp suất hoạt động, điện áp cấp, tín hiệu đầu ra và giới hạn nhiệt độ của cảm biến. Khi triển khai thực tế, cần đối chiếu đúng mã linh kiện và phiên bản tài liệu đang áp dụng."
    },


    {
        keywords: [
            "sơ đồ",
            "dây điện",
            "kết nối",
            "wiring"
        ],

        answer:
            "Sơ đồ kết nối dây điện được tham chiếu trong phần 5.2 Installation Procedure (trang 12) và tài liệu sơ đồ kỹ thuật liên quan. Trước khi đấu nối, cần xác nhận đúng chân tín hiệu, nguồn cấp và tiếp địa theo mã cảm biến cụ thể."
    },


    {
        keywords: [
            "môi trường",
            "nhiệt độ",
            "điều kiện"
        ],

        answer:
            "Trước khi lắp đặt, cần xác nhận điều kiện môi trường nằm trong giới hạn cho phép của thiết bị, giữ khu vực lắp đặt sạch và khô, đồng thời tránh rung động hoặc tác động cơ học vượt quy định. Tham khảo mục 8.3 Safety Precautions (trang 24)."
    },


    {
        keywords: [
            "hiệu chuẩn",
            "calibration"
        ],

        answer:
            "Quy trình hiệu chuẩn được tham chiếu tại mục 6.1 Calibration Method (trang 18). Cần kiểm tra thiết bị đo, thực hiện hiệu chuẩn theo trình tự trong tài liệu, ghi nhận kết quả và xác nhận thông số nằm trong dung sai cho phép."
    },


    {
        keywords: [
            "lắp đặt",
            "cảm biến",
            "pressure sensor",
            "bước"
        ],

        answer:
            "Quy trình minh họa gồm 4 bước: (1) Chuẩn bị dụng cụ và kiểm tra cảm biến; (2) Lắp cảm biến đúng vị trí theo sơ đồ; (3) Kết nối dây điện đúng chân; (4) Kiểm tra rò rỉ và hiệu chuẩn. Hãy đối chiếu mục 5.2 Installation Procedure (trang 12) và mục 6.1 (trang 18)."
    }

];



/* =========================================
   FIND ANSWER
========================================= */

function getAnswer(question) {

    const text =
        question.toLowerCase();


    const result =
        answers.find(item => {

            return item.keywords.some(keyword =>
                text.includes(keyword)
            );

        });


    if (result) {

        return result.answer;

    }


    return `
        Mình có thể hỗ trợ tra cứu quy trình,
        thông số kỹ thuật, sơ đồ kết nối và các
        lưu ý an toàn trong tài liệu kỹ thuật.

        Bạn hãy nhập tên bộ phận, quy trình hoặc
        mục tài liệu cần tìm.
    `;

}



/* =========================================
   ADD USER MESSAGE
========================================= */

function addUserMessage(text) {

    const message =
        document.createElement("div");


    message.className =
        "message user-message";


    message.innerHTML = `

        <div class="message-bubble">

            ${text}

            <time>
                14:35 ✓✓
            </time>

        </div>


        <div class="user-avatar">
            ♟
        </div>

    `;


    chatScroll.appendChild(message);


    chatScroll.scrollTop =
        chatScroll.scrollHeight;

}



/* =========================================
   ADD AI MESSAGE
========================================= */

function addAIMessage(text) {

    const message =
        document.createElement("div");


    message.className =
        "message assistant-message";


    message.innerHTML = `

        <div class="assistant-message-avatar">
            ▣
        </div>


        <div class="answer-bubble">

            <p>
                ${text}
            </p>


            <div class="reference-box">

                <div>

                    ▤ &nbsp;

                    Nguồn tham chiếu:

                    <a href="#">
                        5.2 Installation Procedure
                        (Trang 12)
                    </a>

                    &nbsp; | &nbsp;

                    <a href="#">
                        6.1 Calibration Method
                        (Trang 18)
                    </a>

                </div>


                <small>
                    Nguồn:
                    Technical_Instruction_Denso.pdf
                </small>

            </div>

        </div>

    `;


    chatScroll.appendChild(message);


    chatScroll.scrollTop =
        chatScroll.scrollHeight;

}



/* =========================================
   SEND MESSAGE
========================================= */

chatForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const question =
            chatInput.value.trim();


        if (!question) {

            showToast(
                "Vui lòng nhập câu hỏi."
            );

            return;

        }


        addUserMessage(question);


        chatInput.value = "";


        /*
            Đây hiện chỉ là AI DEMO.
            Sau này có thể thay đoạn này
            bằng API/backend AI thật.
        */

        setTimeout(() => {

            const answer =
                getAnswer(question);


            addAIMessage(answer);

        }, 500);

    }
);



/* =========================================
   SUGGESTION QUESTIONS
========================================= */

document
    .querySelectorAll(".suggestion-list button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                chatInput.value =
                    button.textContent.trim();


                chatForm.requestSubmit();

            }
        );

    });



/* =========================================
   FILE UPLOAD DEMO
========================================= */

const attachButton =
    document.getElementById("attachBtn");


const fileInput =
    document.getElementById("fileInput");


attachButton.addEventListener(
    "click",
    () => {

        fileInput.click();

    }
);


fileInput.addEventListener(
    "change",
    () => {

        const file =
            fileInput.files[0];


        if (file) {

            showToast(
                `Đã chọn tài liệu: ${file.name}`
            );

        }

    }
);



/* =========================================
   DASHBOARD BUTTON
========================================= */

document
    .getElementById("dashboardBtn")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Đây là nút quay lại Dashboard."
            );

        }
    );