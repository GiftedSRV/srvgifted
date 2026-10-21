import React from 'react';
import { useData } from '@/context/DataContext';
import { FileDown, Download, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DocumentsPage: React.FC = () => {
  const { publishedResources } = useData();

  const officialDocs = [
    {
      title: 'แบบฟอร์มขออนุมัติจัดทำโครงงานวิทยาศาสตร์และคณิตศาสตร์ (Proposal Form)',
      desc: 'สำหรับนักเรียนชั้น ม.1 - ม.3 ที่เตรียมส่งเค้าโครงงานวิจัยในภาคเรียนที่ 2',
      type: 'PDF',
      size: '1.2 MB',
      updated: '10 ตุลาคม 2567',
    },
    {
      title: 'ใบขออนุญาตผู้ปกครองเข้าร่วมกิจกรรมค่ายพัฒนาทักษะวิทยาศาสตร์นอกสถานที่',
      desc: 'เอกสารแสดงความยินยอมและการแจ้งข้อมูลสุขภาพประจำตัวนักเรียน',
      type: 'PDF',
      size: '850 KB',
      updated: '5 ตุลาคม 2567',
    },
    {
      title: 'คู่มือระเบียบปฏิบัติและแนวทางการใช้ห้องปฏิบัติการวิทยาศาสตร์',
      desc: 'กฎความปลอดภัย การใช้อุปกรณ์และสารเคมีในห้องแล็บโครงการ GIFTED',
      type: 'PDF',
      size: '2.5 MB',
      updated: '20 กันยายน 2567',
    },
    {
      title: 'แบบฟอร์มรายงานสรุปผลการเข้าร่วมการแข่งขันภายนอกสถานศึกษา',
      desc: 'สำหรับบันทึกผลงาน เกียรติบัตร และภาพกิจกรรมเพื่อนำเข้าสู่ระบบหอเกียรติยศ',
      type: 'DOCX',
      size: '640 KB',
      updated: '1 กันยายน 2567',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-school-dark text-white py-12 border-b-4 border-school-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 text-school-yellow text-xs font-semibold">
              <FileDown className="w-3.5 h-3.5" /> บริการดาวน์โหลด
            </div>
            <h1 className="text-3xl font-bold tracking-tight">เอกสารและแบบฟอร์มดาวน์โหลด</h1>
            <p className="text-sm text-slate-300">
              ศูนย์รวมแบบฟอร์มทางการ ใบสมัคร หนังสือขออนุญาต และคู่มือการปฏิบัติงานของโครงการ
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {officialDocs.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-school-soft text-school-green shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                      {doc.type}
                    </span>
                    <span className="text-[11px] text-slate-400">ขนาด: {doc.size}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900">{doc.title}</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">{doc.desc}</p>
                </div>
              </div>

              <button
                onClick={() => alert(`ดาวน์โหลดแบบฟอร์ม:\n${doc.title}\n(ในระบบจริงเชื่อมโยงไฟล์จาก Supabase Storage)`)}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-school-green text-white text-xs font-semibold hover:bg-school-dark transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลด</span>
              </button>
            </div>
          ))}
        </div>

        {/* Link to all learning resources */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            ต้องการชีทเรียน เอกสารประกอบการสอน หรือข้อสอบเก่า?
          </h3>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            คุณสามารถเข้าชมคลังความรู้ทางวิชาการ (Learning Resources Library) เพื่อค้นหาและดาวน์โหลดเอกสารตามรายวิชา ฟิสิกส์ เคมี ชีววิทยา และคณิตศาสตร์
          </p>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold text-school-green hover:underline pt-1"
          >
            <span>ไปยังคลังความรู้ทางวิชาการ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
