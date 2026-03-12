export function buildReportEmail(userData, result) {

const name = userData?.firstName || "there";
const score = result?.score || "78";

return `

<html>
<body style="margin:0;background:#f1ece4;font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:40px;">

<tr>
<td align="center" style="padding-bottom:30px;">

<img src="https://key-performer-scorecard.vercel.app/logo.png" width="140" style="display:block;margin-bottom:10px;" />

<div style="font-size:12px;letter-spacing:2px;color:#666;">
KEY PERFORMER SCORECARD
</div>

</td>
</tr>

<tr>
<td>

<h1 style="font-size:30px;margin:0 0 20px 0;color:#111;">
Your Key Performer Scorecard Results
</h1>

<p style="font-size:16px;line-height:1.6;color:#333;">
Hi ${name},
</p>

<p style="font-size:16px;line-height:1.6;color:#333;">
Thanks for completing the <strong>Key Performer Scorecard</strong>.
</p>

<p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:30px;">
This diagnostic looks at the five performance drivers most consistently associated with professionals who continue progressing into larger roles and responsibilities.
</p>

</td>
</tr>

<tr>
<td style="background:#f7f5f1;border-radius:8px;padding:28px;margin-bottom:30px;">

<div style="font-size:12px;letter-spacing:2px;color:#999;margin-bottom:10px;">
YOUR SCORE
</div>

<div style="font-size:42px;font-weight:bold;color:#ff2846;margin-bottom:10px;">
${score}%
</div>

<p style="font-size:15px;line-height:1.6;color:#333;margin:0;">
This score reflects the balance between your <strong>current performance</strong> and the signals of <strong>future leadership potential</strong>.
</p>

</td>
</tr>

<tr>
<td style="padding-top:30px;">

<h2 style="font-size:20px;margin-bottom:10px;color:#111;">
Interpreting your results
</h2>

<p style="font-size:15px;line-height:1.7;color:#333;">
As a guide, scores <strong>above 70%</strong> generally suggest you are demonstrating many of the behaviours associated with high-performing operators.
</p>

<p style="font-size:15px;line-height:1.7;color:#333;">
Scores below this range usually indicate that one or two areas may be limiting how clearly your performance is recognised or trusted within the organisation.
</p>

<p style="font-size:15px;line-height:1.7;color:#333;">
The five dimensions in the scorecard represent the patterns we most consistently see in professionals who continue progressing into larger roles and responsibilities.
</p>

<p style="font-size:15px;line-height:1.7;color:#333;">
The goal is not perfection across every dimension, but ensuring that none of them become a constraint on your trajectory.
</p>

</td>
</tr>

<tr>
<td style="padding-top:30px;">

<h2 style="font-size:20px;margin-bottom:10px;color:#111;">
Improving your score
</h2>

<p style="font-size:15px;line-height:1.7;color:#333;">
The mistake most ambitious people make when trying to improve is assuming they simply need to work harder.
</p>

<p style="font-size:15px;line-height:1.7;color:#333;">
Most of the time, improvement comes from identifying the one or two constraints that are limiting your visibility, influence, or execution under pressure.
</p>

<p style="font-size:15px;line-height:1.7;color:#333;">
This is exactly what we help professionals diagnose and address inside the <strong>Key Performer Programme</strong>.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding-top:40px;">

<p style="font-size:16px;color:#333;margin-bottom:20px;">
If you’d like help understanding the fastest way to strengthen your trajectory, you can join the waitlist for the <strong>Key Performer Programme</strong>.
</p>

<a href="https://foundperform.com" style="display:inline-block;background:#ff2846;color:#ffffff;text-decoration:none;padding:16px 28px;border-radius:4px;font-weight:bold;font-size:15px;">
Join the KPP Waitlist
</a>

<p style="font-size:13px;color:#777;margin-top:20px;">
You’ll receive new insights, an invitation to our private WhatsApp group of similarly ambitious professionals, and early access when the next cohort launches.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>

`;
}