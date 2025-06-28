import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">إخلاء المسؤولية</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none dark:prose-invert text-right">
            <p>
              المعلومات المقدمة من ChatGPT Pro ("نحن"، "لنا"، أو "خاصتنا") على هذا الموقع هي لأغراض إعلامية عامة فقط. جميع المعلومات على الموقع مقدمة بحسن نية، ومع ذلك، فإننا لا نقدم أي تعهد أو ضمان من أي نوع، صريحًا كان أم ضمنيًا، بشأن دقة، كفاية، صلاحية، موثوقية، توفر أو اكتمال أي معلومات على الموقع.
            </p>
            <p>
              تحت أي ظرف من الظروف، لن نتحمل أي مسؤولية تجاهك عن أي خسارة أو ضرر من أي نوع يحدث نتيجة لاستخدام الموقع أو الاعتماد على أي معلومات مقدمة على الموقع. إن استخدامك للموقع واعتمادك على أي معلومات على الموقع هو على مسؤوليتك الخاصة وحدك.
            </p>
            <h2 className="text-right">إخلاء المسؤولية عن المحتوى الذي يتم إنشاؤه بواسطة الذكاء الاصطناعي</h2>
            <p>
              يستخدم هذا الموقع نماذج لغة كبيرة ("LLMs") لإنشاء نص. قد يكون المحتوى الذي يتم إنشاؤه بواسطة الذكاء الاصطناعي غير دقيق أو غير كامل أو مسيء. نحن لا نتحمل أي مسؤولية عن أي محتوى يتم إنشاؤه بواسطة الذكاء الاصطناعي. أنت مسؤول عن استخدامك لأي محتوى يتم إنشاؤه بواسطة الذكاء الاصطناعي.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
