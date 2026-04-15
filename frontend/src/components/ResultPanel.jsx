import { useRef } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ContentCard from './ContentCard';
import CopyButton from './CopyButton';

function ResultPanel({ result }) {
  const pdfRef = useRef(null);

  const handleDownloadPdf = async () => {
    if (!pdfRef.current) {
      return;
    }

    const canvas = await html2canvas(pdfRef.current, { scale: 2, backgroundColor: '#08111f' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save('smart-career-assistant-output.pdf');
  };

  const skillsText = result.atsSkills.join('\n');
  const projectsText = result.projectDescriptions.join('\n\n');

  return (
    <div className="space-y-6" ref={pdfRef}>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </button>
      </div>
      <ContentCard title="Resume Summary" actions={<CopyButton text={result.summary} />}>
        <p>{result.summary}</p>
      </ContentCard>
      <ContentCard title="ATS-Optimized Skills" actions={<CopyButton text={skillsText} />}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {result.atsSkills.map((skill) => (
            <li key={skill} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              {skill}
            </li>
          ))}
        </ul>
      </ContentCard>
      <ContentCard title="Project Descriptions" actions={<CopyButton text={projectsText} />}>
        <div className="space-y-4">
          {result.projectDescriptions.map((project) => (
            <div key={project} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              {project}
            </div>
          ))}
        </div>
      </ContentCard>
      <ContentCard title="Cover Letter" actions={<CopyButton text={result.coverLetter} />}>
        <p className="whitespace-pre-line">{result.coverLetter}</p>
      </ContentCard>
    </div>
  );
}

export default ResultPanel;
