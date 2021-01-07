/*
This is empty on purpose! Your code to build the resume will go here.
 */

var bio = {
    "name": "Monika Maheshwari",
    "role": "Full Stack Developer",
    "contacts": {
        "mobile": "9998694220",
        "email": "monikamaheshwari1996@gmail.com",
        "github": "https://github.com/monikamaheshwari",
        "location": "Udaipur,Rajasthan"
    },
    "welcomeMessage": "Whatever you are thinking... think bigger",
    "skills": ["HTML", "CSS", "PHP", "AngularJs", "NodeJs", "Elasticsearch", "MongoDB", "JavaScript", "Ajax", "Bootstrap", "Java", "JQuery"],
    "biopic": "images/biopic.jpg"
};

var work = {
    "jobs": [{
            "employer": "Sierrie Technologies",
            "title": "Responsible Person of frontend team",
            "location": "Work from Home",
            "dates": "12/2016 - 4/2017",
            "description": "building website using MEAN stack development"
        },
        {
            "employer": "Zapty Software",
            "title": "Software Engineer",
            "location": "Bengaluru",
            "dates": "In progress",
            "description": "Working on server side Node.js,MongoDB,Elasticsearch"
        }
    ]
};

var education = {
    "schools": [{
            "name": "Alok Senior Secondary School",
            "location": "Udaipur,Rajasthan",
            "degree": "twelfth",
            "majors": ["Physics", "Chemistry", "Maths"],
            "dates": "6/14",
            "url": "www.alokschool.org",
        },
        {
            "name": "Indian Institute of Information Technology, Vadodara",
            "location": "Gandhinagar, Gujarat",
            "degree": "B.Tech.",
            "majors": ["Computer Science"],
            "dates": "7/18",
            "url": "www.iiitvadodara.ac.in",
        }
    ],
    "onlineCourses": [{
            "title": "Udacity front-end developer Nanodegree",
            "school": "Udacity",
            "dates": "6/17",
            "url": "www.udacity.com"
        },
        {
            "title": "NPTEL modern web development",
            "school": "NPTEL",
            "dates": "11/16",
            "url": "www.nptel.ac.in"
        }
    ]
};

var projects = {
    "projects": [{
            "title": "Anotode",
            "dates": "8/2016 - 1/2017",
            "description": "An application which increase the user experience on internet. It save the text which we highlight on the web through chrome extension. There is web and android application of it. Server is done in Node.js and front-end in AngularJs.",
            "images": ["images/p1.png"]
        }
    ]
};

$("#main").append(internationalizeButton);

bio.display = function() {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    $("#header").append(formattedName);

    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    $("#header").append(formattedRole);

    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);

    $("#topContacts").append(formattedMobile);
    $("#topContacts").append(formattedEmail);
    $("#topContacts").append(formattedGithub);
    $("#topContacts").append(formattedLocation);

    $("#footerContacts").append(formattedMobile);
    $("#footerContacts").append(formattedEmail);
    $("#footerContacts").append(formattedGithub);
    $("#footerContacts").append(formattedLocation);

    var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
    $("#header").append(formattedBioPic);

    var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#header").append(formattedWelcomeMsg);

    if (bio.skills.length) {
        $("#header").append(HTMLskillsStart);
        bio.skills.forEach(function(skill) {
            var formattedSkill = HTMLskills.replace("%data%", skill);
            $("#skills").append(formattedSkill);
        });
    }
};

bio.display();

work.display = function() {
    work.jobs.forEach(function(job) {
        $("#workExperience").append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
        $(".work-entry:last").append(formattedEmployer);

        var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
        $(".work-entry:last").append(formattedTitle);

        var formattedDates = HTMLworkDates.replace("%data%", job.dates);
        $(".work-entry:last").append(formattedDates);

        var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
        $(".work-entry:last").append(formattedLocation);

        var formattedDescription = HTMLworkDescription.replace("%data%", job.description);
        $(".work-entry:last").append(formattedDescription);

    });
};

work.display();

education.display = function() {
    education.schools.forEach(function(school) {
        $("#education").append(HTMLschoolStart);

        var formattedName = HTMLschoolName.replace("%data%", school.name);
        $(".education-entry:last").append(formattedName);

        var formattedDegree = HTMLschoolDegree.replace("%data%", school.degree);
        $(".education-entry:last").append(formattedDegree);

        var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);
        $(".education-entry:last").append(formattedLocation);

        var formattedDates = HTMLschoolDates.replace("%data%", school.dates);
        $(".education-entry:last").append(formattedDates);

        if (school.majors.length > 0) {
            school.majors.forEach(function(major) {
                var formattedMajor = HTMLschoolMajor.replace("%data%", major);
                $(".education-entry:last").append(formattedMajor);
            });
        }
    });

    $(".education-entry:last").append(HTMLonlineClasses);
    education.onlineCourses.forEach(function(course) {
        var formattedTitle = HTMLonlineTitle.replace("%data%", course.title);
        $(".education-entry:last").append(formattedTitle);

        var formattedSchool = HTMLonlineSchool.replace("%data%", course.school);
        $(".education-entry:last").append(formattedSchool);

        var formattedDates = HTMLonlineDates.replace("%data%", course.dates);
        $(".education-entry:last").append(formattedDates);

        var formattedURL = HTMLonlineURL.replace("%data%", course.url);
        $(".education-entry:last").append(formattedURL);
    });
};

education.display();

projects.display = function() {
    projects.projects.forEach(function(project) {
        $("#projects").append(HTMLprojectStart);

        var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
        $(".project-entry:last").append(formattedTitle);

        var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
        $(".project-entry:last").append(formattedDates);

        var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);
        $(".project-entry:last").append(formattedDescription);

        if (project.images.length > 0) {
            project.images.forEach(function(image) {
                var formattedImage = HTMLprojectImage.replace("%data%", image);
                $(".project-entry:last").append(formattedImage);
            });
        }
    });
};

projects.display();
$("#mapDiv").append(googleMap);
