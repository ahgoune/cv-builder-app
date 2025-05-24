document.addEventListener('DOMContentLoaded', () => {
    // جلب العناصر الأساسية من HTML
    const nameInput = document.getElementById('name');
    const titleInput = document.getElementById('title');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const linkedinInput = document.getElementById('linkedin');
    const githubInput = document.getElementById('github');
    const summaryInput = document.getElementById('summary');
    const skillsInput = document.getElementById('skills');
    const languagesInput = document.getElementById('languages');

    const educationEntriesDiv = document.getElementById('education-entries');
    const addEducationBtn = document.getElementById('add-education');
    const experienceEntriesDiv = document.getElementById('experience-entries');
    const addExperienceBtn = document.getElementById('add-experience');
    const projectEntriesDiv = document.getElementById('project-entries');
    const addProjectBtn = document.getElementById('add-project');

    const cvPreviewArea = document.getElementById('cv-preview');
    const previewName = document.getElementById('preview-name');
    const previewTitle = document.getElementById('preview-title');
    const previewEmail = document.getElementById('preview-email');
    const previewPhone = document.getElementById('preview-phone');
    const previewLinkedin = document.getElementById('preview-linkedin');
    const previewGithub = document.getElementById('preview-github');
    const previewSummary = document.getElementById('preview-summary');
    const previewEducation = document.getElementById('preview-education');
    const previewExperience = document.getElementById('preview-experience');
    const previewSkills = document.getElementById('preview-skills');
    const previewLanguages = document.getElementById('preview-languages');
    const previewProjects = document.getElementById('preview-projects');
    const projectsSection = document.querySelector('.cv-section.projects'); // للحكم على عرض قسم المشاريع

    const templateOptions = document.querySelectorAll('.template-option');
    const downloadPdfBtn = document.getElementById('download-pdf');

    // دالة لتحديث المعاينة (Preview)
    function updatePreview() {
        // تحديث المعلومات الشخصية
        previewName.textContent = nameInput.value || 'اسمك الكامل';
        previewTitle.textContent = titleInput.value || 'المسمى الوظيفي';
        
        // تحديث معلومات الاتصال مع الأيقونات وإخفاء إذا كانت فارغة
        previewEmail.innerHTML = emailInput.value ? `<i class="fas fa-envelope"></i> ${emailInput.value}` : '';
        previewPhone.innerHTML = phoneInput.value ? `<i class="fas fa-phone"></i> ${phoneInput.value}` : '';
        
        if (linkedinInput.value) {
            previewLinkedin.innerHTML = `<i class="fab fa-linkedin"></i> <a href="${linkedinInput.value}" target="_blank">${linkedinInput.value.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//, '')}</a>`;
            previewLinkedin.style.display = 'inline-block';
        } else {
            previewLinkedin.style.display = 'none';
        }

        if (githubInput.value) {
            previewGithub.innerHTML = `<i class="fab fa-github"></i> <a href="${githubInput.value}" target="_blank">${githubInput.value.replace(/^(https?:\/\/)?(www\.)?github\.com\//, '')}</a>`;
            previewGithub.style.display = 'inline-block';
        } else {
            previewGithub.style.display = 'none';
        }

        previewSummary.textContent = summaryInput.value || 'اكتب ملخصًا موجزًا عن خبراتك وأهدافك المهنية.';

        // تحديث قسم التعليم
        previewEducation.innerHTML = ''; // تفريغ المحتوى الحالي
        document.querySelectorAll('.education-entry').forEach(entry => {
            const degree = entry.querySelector('.degree').value;
            const university = entry.querySelector('.university').value;
            const dates = entry.querySelector('.edu-dates').value;

            if (degree || university || dates) {
                const li = document.createElement('li');
                li.classList.add('education-item');
                li.innerHTML = `
                    <h3>${degree || 'الدرجة العلمية'}</h3>
                    <p>${university || 'الجامعة/المؤسسة'} - ${dates || 'السنوات'}</p>
                `;
                previewEducation.appendChild(li);
            }
        });

        // تحديث قسم الخبرة المهنية
        previewExperience.innerHTML = ''; // تفريغ المحتوى الحالي
        document.querySelectorAll('.experience-entry').forEach(entry => {
            const jobTitle = entry.querySelector('.job-title').value;
            const company = entry.querySelector('.company').value;
            const jobDates = entry.querySelector('.job-dates').value;
            const jobDescription = entry.querySelector('.job-description').value;

            if (jobTitle || company || jobDates || jobDescription) {
                const li = document.createElement('li');
                li.classList.add('experience-item');
                let descriptionHtml = '';
                if (jobDescription) {
                    // تقسيم الوصف إلى نقاط إذا كان هناك عدة أسطر
                    const descPoints = jobDescription.split('\n').filter(point => point.trim() !== '');
                    if (descPoints.length > 0) {
                        descriptionHtml = '<ul>' + descPoints.map(point => `<li>${point.trim()}</li>`).join('') + '</ul>';
                    }
                }
                li.innerHTML = `
                    <h3>${jobTitle || 'المسمى الوظيفي'}</h3>
                    <p>${company || 'الشركة'} - ${jobDates || 'السنوات'}</p>
                    ${descriptionHtml}
                `;
                previewExperience.appendChild(li);
            }
        });

        // تحديث قسم المهارات
        previewSkills.innerHTML = '';
        if (skillsInput.value) {
            const skillsArray = skillsInput.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
            skillsArray.forEach(skill => {
                const li = document.createElement('li');
                li.classList.add('skill-item');
                li.textContent = skill;
                previewSkills.appendChild(li);
            });
        }

        // تحديث قسم اللغات
        previewLanguages.innerHTML = '';
        if (languagesInput.value) {
            const languagesArray = languagesInput.value.split(',').map(lang => lang.trim()).filter(lang => lang !== '');
            languagesArray.forEach(lang => {
                const li = document.createElement('li');
                li.classList.add('language-item');
                li.textContent = lang;
                previewLanguages.appendChild(li);
            });
        }

        // تحديث قسم المشاريع (إخفاء/إظهار القسم بناءً على وجود بيانات)
        previewProjects.innerHTML = '';
        let hasProjects = false;
        document.querySelectorAll('.project-entry').forEach(entry => {
            const projectName = entry.querySelector('.project-name').value;
            const projectLink = entry.querySelector('.project-link').value;
            const projectDescription = entry.querySelector('.project-description').value;

            if (projectName || projectLink || projectDescription) {
                hasProjects = true;
                const li = document.createElement('li');
                li.classList.add('project-item');
                let linkHtml = projectLink ? ` (<a href="${projectLink}" target="_blank">المشروع</a>)` : '';
                let descriptionHtml = '';
                if (projectDescription) {
                    const descPoints = projectDescription.split('\n').filter(point => point.trim() !== '');
                    if (descPoints.length > 0) {
                        descriptionHtml = '<ul>' + descPoints.map(point => `<li>${point.trim()}</li>`).join('') + '</ul>';
                    }
                }
                li.innerHTML = `
                    <h3>${projectName || 'اسم المشروع'}${linkHtml}</h3>
                    ${descriptionHtml}
                `;
                previewProjects.appendChild(li);
            }
        });

        if (hasProjects) {
            projectsSection.style.display = 'block';
        } else {
            projectsSection.style.display = 'none';
        }
    }

    // إضافة مستمعي الأحداث لتحديث المعاينة عند كل تغيير
    document.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('input', updatePreview);
    });

    // دالة لإضافة حقل تعليم جديد
    addEducationBtn.addEventListener('click', () => {
        const newEntry = document.createElement('div');
        newEntry.classList.add('education-entry');
        newEntry.innerHTML = `
            <div class="form-group">
                <label>الدرجة العلمية:</label>
                <input type="text" class="degree" placeholder="مثال: بكالوريوس في علوم الحاسوب">
            </div>
            <div class="form-group">
                <label>الجامعة/المؤسسة:</label>
                <input type="text" class="university" placeholder="مثال: جامعة دبي">
            </div>
            <div class="form-group">
                <label>السنوات:</label>
                <input type="text" class="edu-dates" placeholder="مثال: 2018 - 2022">
            </div>
            <button type="button" class="remove-entry">حذف</button>
        `;
        educationEntriesDiv.appendChild(newEntry);
        newEntry.querySelectorAll('input').forEach(input => input.addEventListener('input', updatePreview));
        newEntry.querySelector('.remove-entry').addEventListener('click', () => {
            newEntry.remove();
            updatePreview();
        });
    });

    // دالة لإضافة حقل خبرة جديد
    addExperienceBtn.addEventListener('click', () => {
        const newEntry = document.createElement('div');
        newEntry.classList.add('experience-entry');
        newEntry.innerHTML = `
            <div class="form-group">
                <label>المسمى الوظيفي:</label>
                <input type="text" class="job-title" placeholder="مثال: مطور ويب">
            </div>
            <div class="form-group">
                <label>الشركة:</label>
                <input type="text" class="company" placeholder="مثال: شركة البرمجة المحدودة">
            </div>
            <div class="form-group">
                <label>السنوات:</label>
                <input type="text" class="job-dates" placeholder="مثال: 2022 - حتى الآن">
            </div>
            <div class="form-group">
                <label>وصف المهام والإنجازات:</label>
                <textarea class="job-description" rows="3" placeholder="اذكر المسؤوليات الرئيسية والإنجازات..."></textarea>
            </div>
            <button type="button" class="remove-entry">حذف</button>
        `;
        experienceEntriesDiv.appendChild(newEntry);
        newEntry.querySelectorAll('input, textarea').forEach(input => input.addEventListener('input', updatePreview));
        newEntry.querySelector('.remove-entry').addEventListener('click', () => {
            newEntry.remove();
            updatePreview();
        });
    });

    // دالة لإضافة حقل مشروع جديد
    addProjectBtn.addEventListener('click', () => {
        const newEntry = document.createElement('div');
        newEntry.classList.add('project-entry');
        newEntry.innerHTML = `
            <div class="form-group">
                <label>اسم المشروع:</label>
                <input type="text" class="project-name" placeholder="مثال: تطبيق إدارة المهام">
            </div>
            <div class="form-group">
                <label>رابط المشروع (اختياري):</label>
                <input type="url" class="project-link" placeholder="مثال: https://yourproject.com">
            </div>
            <div class="form-group">
                <label>وصف المشروع:</label>
                <textarea class="project-description" rows="3" placeholder="وصف موجز للمشروع ودورك فيه..."></textarea>
            </div>
            <button type="button" class="remove-entry">حذف</button>
        `;
        projectEntriesDiv.appendChild(newEntry);
        newEntry.querySelectorAll('input, textarea').forEach(input => input.addEventListener('input', updatePreview));
        newEntry.querySelector('.remove-entry').addEventListener('click', () => {
            newEntry.remove();
            updatePreview();
        });
    });

    // التحكم في تبديل القوالب
    templateOptions.forEach(option => {
        option.addEventListener('click', () => {
            // إزالة فئة 'active' من جميع الخيارات
            templateOptions.forEach(opt => opt.classList.remove('active'));
            // إضافة فئة 'active' للخيار الحالي
            option.classList.add('active');

            // تغيير فئة القالب على منطقة المعاينة
            const selectedTemplate = option.dataset.template;
            cvPreviewArea.className = 'cv-preview-area ' + selectedTemplate + '-template';
            
            // تحديث المعاينة لضمان تطبيق التنسيقات الجديدة
            updatePreview();
        });
    });

    // وظيفة تنزيل PDF
downloadPdfBtn.addEventListener('click', () => {
    const element = cvPreviewArea; // العنصر المستهدف الذي سيتم تحويله إلى PDF

    // إعدادات html2pdf المتقدمة
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5], // الهوامش (أعلى، يمين، أسفل، يسار) بالبوصة
        filename: 'السيرة-الذاتية.pdf', // اسم ملف PDF عند التنزيل
        image: { type: 'jpeg', quality: 0.98 }, // نوع وجودة الصورة الملتقطة من HTML
        html2canvas: { // هذا هو الجزء المهم: إعدادات مكتبة html2canvas
            scale: 3,                 // مقياس العرض لزيادة الجودة (كلما زاد الرقم زادت الجودة وحجم الملف)
            logging: true,            // لتفعيل رسائل السجل في Console المتصفح (مفيد للتشخيص)
            dpi: 192,                 // نقطة في البوصة (كلما زادت زادت جودة الصورة الملتقطة)
            letterRendering: true,    // محاولة الحفاظ على عرض الخطوط بوضوح
            useCORS: true,            // السماح بتحميل الموارد عبر نطاقات مختلفة
            scrollY: -window.scrollY, // ضبط موضع الالتقاط إذا كانت الصفحة قد تم التمرير فيها

            // هذه هي الخيارات الجديدة والمهمة لتحسين عرض الخطوط والمحتوى المعقد:
            allowTaint: true,
            foreignObjectRendering: true
        },
        jsPDF: { // إعدادات مكتبة jsPDF التي تقوم بإنشاء ملف PDF الفعلي
            unit: 'in',        // وحدة القياس (بوصة)
            format: 'letter',  // حجم الصفحة (رسالة أمريكية)
            orientation: 'portrait' // اتجاه الصفحة (عمودي)
        }
    };

    // استخدام html2pdf لإنشاء وتنزيل ملف PDF
    // إضافة تأخير (setTimeout) لضمان أن جميع العناصر قد تم تحميلها وتنسيقها قبل الالتقاط
    setTimeout(() => {
        html2pdf().set(opt).from(element).save();
    }, 1500); // 1.5 ثانية تأخير (يمكن زيادته إذا استمرت المشكلة)
});

    // تحديث المعاينة الأولية عند تحميل الصفحة
    updatePreview();
});