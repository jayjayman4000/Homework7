$(function () {
    const developerName = "Jeremiah J Allen";
    let hasDownloadedResume = false;
    let editingIndex = -1;
    let sortAscending = true;

    const navItems = [
        { label: "Skills", sectionId: "skills" },
        { label: "Projects", sectionId: "projects" },
        { label: "Education", sectionId: "education" },
        { label: "Contact", sectionId: "summary" }
    ];

    const skills = ["HTML", "CSS", "JavaScript"];

    const projects = [
        {
            title: "Cross Platform AI Assistant",
            description: "Desktop AI assistant focused on productivity and local workflows.",
            deadline: new Date("2026-04-20"),
            imageURL: "./ai.png"
        },
        {
            title: "Black-Scholes Calculator",
            description: "Option pricing calculator using the Black-Scholes model for call options.",
            deadline: new Date("2026-03-30"),
            imageURL: "./blackscholes.png"
        },
        {
            title: "Resume Website",
            description: "Personal resume and portfolio website with responsive layout and project showcase.",
            deadline: new Date("2026-05-10"),
            imageURL: "./pp1.jpg"
        },
        {
            title: "ComfyUI AI Image and Video Tool",
            description: "Ongoing visual workflow tool experiments for image and video generation.",
            deadline: new Date("2026-06-30"),
            imageURL: "./ComfyUI AI.png"
        }
    ];

    function showGreeting(name) {
        return "Hello, my name is " + name + "! Welcome to my portfolio.";
    }

    function normalizeSkill(skillText) {
        return skillText.trim().toLowerCase();
    }

    function formatDate(dateValue) {
        return dateValue.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    function validateSkill(skillText, done) {
        const cleanSkill = skillText.trim();
        if (!cleanSkill) {
            done(false, "Please enter a skill.");
            return;
        }

        const duplicateFound = skills.some(function (currentSkill, index) {
            if (index === editingIndex) {
                return false;
            }
            return normalizeSkill(currentSkill) === normalizeSkill(cleanSkill);
        });

        if (duplicateFound) {
            done(false, "That skill already exists in the list.");
            return;
        }

        done(true, "");
    }

    function clearSkillForm() {
        $("#skillInput").val("").focus();
        $("#skillError").text("");
        editingIndex = -1;
        $("#addSkillBtn").text("Add Skill");
    }

    function renderNavigation() {
        const $nav = $("#dynamicNav");
        $nav.empty();

        navItems.forEach(function (item) {
            const $li = $("<li>").addClass("nav-item");
            const $link = $("<a>")
                .addClass("nav-link")
                .attr("href", "#" + item.sectionId)
                .text(item.label)
                .on("click", function (event) {
                    event.preventDefault();
                    const destination = $("#" + item.sectionId).offset().top - 70;
                    $("html, body").animate({ scrollTop: destination }, 600);
                });

            $li.append($link);
            $nav.append($li);
        });
    }

    function createSkillListItem(skillText, index) {
        const $item = $("<li>")
            .addClass("list-group-item d-flex justify-content-between align-items-center skill-item")
            .attr("data-index", index)
            .hide();

        const $nameButton = $("<button>")
            .attr("type", "button")
            .addClass("btn btn-link text-decoration-none p-0 skill-name")
            .text(skillText)
            .on("click", function () {
                editingIndex = index;
                $("#skillInput").val(skills[index]).focus();
                $("#addSkillBtn").text("Update Skill");
                $("#skillError").text("");
            });

        const $deleteButton = $("<button>")
            .attr("type", "button")
            .addClass("btn btn-sm btn-danger")
            .text("Delete")
            .on("click", function () {
                skills.splice(index, 1);
                renderSkills($("#skillSearch").val());
            });

        $item.append($nameButton, $deleteButton);
        return $item;
    }

    function renderSkills(searchText) {
        const query = (searchText || "").trim().toLowerCase();
        const $list = $("#skillsList");
        $list.stop(true, true).slideUp(120, function () {
            $list.empty();

            skills.forEach(function (skill, index) {
                if (!query || normalizeSkill(skill).includes(query)) {
                    const $skillItem = createSkillListItem(skill, index);
                    $list.append($skillItem);
                    $skillItem.fadeIn(180);
                }
            });

            $list.slideDown(160);
        });
    }

    function updateSkills(skillText, callback) {
        validateSkill(skillText, function (isValid, validationMessage) {
            if (!isValid) {
                $("#skillError").text(validationMessage);
                return;
            }

            const trimmedSkill = skillText.trim();
            if (editingIndex >= 0) {
                skills[editingIndex] = trimmedSkill;
            } else {
                skills.push(trimmedSkill);
            }

            callback();
        });
    }

    function sortProjectsByDeadline(isAscending) {
        projects.sort(function (a, b) {
            return isAscending ? a.deadline - b.deadline : b.deadline - a.deadline;
        });
    }

    function renderProjects() {
        const $container = $("#projectsContainer");
        $container.fadeOut(120, function () {
            $container.empty();

            for (let i = 0; i < projects.length; i += 1) {
                const project = projects[i];
                const projectCard = `
                    <div class="col">
                        <article class="card h-100 shadow-sm project-card">
                            <img src="${project.imageURL}" class="card-img-top project-image" alt="${project.title}">
                            <div class="card-body d-flex flex-column">
                                <h3 class="h5 card-title">${project.title}</h3>
                                <p class="card-text mb-2">${project.description}</p>
                                <p class="small text-muted mt-auto mb-0"><strong>Deadline:</strong> ${formatDate(project.deadline)}</p>
                            </div>
                        </article>
                    </div>
                `;
                $container.append(projectCard);
            }

            $container.fadeIn(160);
        });
    }

    function registerKeyboardHandlers() {
        $("#skillInput").on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                $("#skillForm").trigger("submit");
            }

            if (event.key === "Escape") {
                event.preventDefault();
                $("#skillForm").find("input").val("");
                clearSkillForm();
                renderSkills("");
            }
        });
    }

    function setupSkillEvents() {
        $("#skillForm").on("submit", function (event) {
            event.preventDefault();
            const inputSkill = $("#skillInput").val();

            updateSkills(inputSkill, function () {
                $("#skillError").text("");
                clearSkillForm();
                renderSkills($("#skillSearch").val());
            });
        });

        $("#skillSearch").on("input", function () {
            renderSkills($(this).val());
        });
    }

    function setupProjectSorting() {
        $("#sortProjectsBtn").on("click", function () {
            sortProjectsByDeadline(sortAscending);
            renderProjects();

            sortAscending = !sortAscending;
            const buttonLabel = sortAscending
                ? "Sort by Deadline: Earliest First"
                : "Sort by Deadline: Latest First";
            $(this).text(buttonLabel);
        });
    }

    function setupDownloadResume() {
        $("#downloadPdfBtn").on("click", function () {
            if (!hasDownloadedResume) {
                alert("Your resume is downloading.");
                hasDownloadedResume = true;
            }

            const options = {
                margin: 0.5,
                filename: "Jeremiah-Allen-Resume.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
            };

            html2pdf().set(options).from(document.body).save();
        });
    }

    $("#greetingMessage").text(showGreeting(developerName));

    renderNavigation();
    renderSkills("");
    sortProjectsByDeadline(true);
    renderProjects();

    setupSkillEvents();
    registerKeyboardHandlers();
    setupProjectSorting();
    setupDownloadResume();
});
