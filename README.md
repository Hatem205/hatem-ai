# حاتم AI — مشروع تجريبي

موقع ثابت (Static) يجمع أدوات ذكاء اصطناعي تجريبية: توليد النصوص، توليد الصور، تحسين النصوص، التلخيص، الأفكار، ومولد البرومبتات.

> **تنبيه:** كل النتائج Mock Data لأغراض العرض والتدريب فقط. لا يوجد Backend ولا دفع حقيقي.

## البنية

```
index.html          الرئيسية
tools.html          (تُنشأ لاحقًا) فهرس الأدوات
tools/text.html     مولد النصوص (genText)
tools/image.html    مولد الصور (genImage)
tools/improve.html  تحسين النصوص (improve)
tools/summarize.html التلخيص (summarize)
tools/ideas.html    الأفكار (genIdeas)
tools/prompt.html   البرومبتات (genPrompt)
dashboard.html      اللوحة (renderDash + حماية hatim-user)
settings.html       الإعدادات (bindSwitch + toggleTheme)
404.html            صفحة الخطأ
assets/css/style.css التصميم
assets/js/app.js    المنطق
.nojekyll           لتعطيل Jekyll على Pages
```

## التشغيل محليًا

افتح `index.html` مباشرة في المتصفح، أو شغّل سيرفر بسيط:

```bash
cd hatem-ai
python -m http.server 8000
# ثم افتح http://localhost:8000
```

## النشر على GitHub Pages

1. ارفع المجلد إلى مستودع GitHub.
2. من **Settings → Pages** اختر **Deploy from a branch**.
3. اختر الفرع `main` والمجلد `/root` (أو `/docs` إذا نقلت الملفات إليه).
4. احفظ — سيظهر رابط `https://USER.github.io/REPO/`.
5. ملف `.nojekyll` موجود لمنع معالجة Jekyll للملفات التي تبدأ بشرطة سفلية.

## ملاحظات

- الثيم يُحفظ في `localStorage` بمفتاح `hatim-theme`.
- الاستخدام والمفضلة والأخيرة تُحفظ في `hatim-usage` / `hatim-fav` / `hatim-recent`.
- لوحة التحكم تعرض نافذة ضيف إذا لم يوجد `hatim-user`.
