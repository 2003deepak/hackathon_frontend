import React, { useState , useRef} from "react";
import {
  Search,
  Sparkles,
  Shield,
  RefreshCw,
  FileCheck,
  Download,
  ChevronRight,
  ChevronLeft, Clock, User, Calendar
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import axios from "axios";

function TopicSelection() {
  const [currentPage, setCurrentPage] = useState("topic");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState([
    "AI in Healthcare",
    "Sustainable Living",
    "Future of Work",
    "Digital Privacy",
    "Mental Wellness",
    "Tech Innovations",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [contentLoading, setContentLoading] = useState(false);
  const [pLoading, setpLoading] = useState(false);
  const [rloading, setrLoading] = useState(false);
  const [plagiarismStats, setPlagiarismStats] = useState(null);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "AI Blog",
  });

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
    pdf.save(`${selectedTopic}.pdf`);
  };


  // Fetch trending topics from API
  const fetchTrendingTopics = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.get("https://your-api.com/trending");
      setTrendingTopics(response.data.topics || []);
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle input change
  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };


  const generateContent = async () => {
    setContentLoading(true);
    try {
      const response = await axios.post("https://your-backend.com/generate", {
        topic: selectedTopic,
      });
      setContent(response.data.generatedContent);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setContentLoading(false);
    }
  };

  const refineContent = async () => {
    setrLoading(true);
    try {
      const response = await axios.post("https://your-backend.com/refine", {
        content,
      });
      setContent(response.data.refinedContent);
    } catch (error) {
      console.error("Error refining content:", error);
    } finally {
      setrLoading(false);
    }
  };

  const checkPlagiarism = async () => {
    setpLoading(true);
    try {
      const response = await axios.post("https://your-backend.com/plagiarism", {
        content,
      });
      setPlagiarismStats(response.data);
    } catch (error) {
      console.error("Error checking plagiarism:", error);
    } finally {
      setpLoading(false);
    }
  };

  const Marquee = ({ children }) => (
    <div className="relative w-full overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex gap-4">{children}{children}</div>
    </div>
  );


  const renderTopicPage = () => (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Create Amazing Blog Content with AI
        </h1>
        <p className="text-gray-600">
          Generate engaging blog posts in minutes with our AI-powered platform
        </p>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Enter your blog topic..."
          className="w-full px-6 py-4 rounded-xl border border-gray-200 shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedTopic}
          disabled={isGenerating}
          onChange={handleTopicChange}
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
        <div className="relative overflow-hidden">
      <h2 className="text-2xl font-semibold text-center mb-6">🔥 Trending Topics</h2>

      {/* Marquee Wrapper */}
      <Marquee>
        {trendingTopics.map((topic, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedTopic(topic)}
            className="p-4 rounded-lg shadow-lg border border-gray-200 text-white text-lg font-semibold cursor-pointer transition-all"
            whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: `linear-gradient(135deg, hsl(${index * 40}, 80%, 60%), hsl(${index * 40 + 30}, 80%, 50%))`,
            }}
          >
            {topic}
          </motion.button>
        ))}
      </Marquee>
    </div>
        <button
          onClick={fetchTrendingTopics}
          disabled={isGenerating}
          className="mt-4 flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          {isGenerating ? (
            <RefreshCw className="animate-spin" size={18} />
          ) : (
            "Generate Topics"
          )}
        </button>
      </div>

      <button
        onClick={() => setCurrentPage("content")}
        disabled={!selectedTopic}
        className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${
          !selectedTopic ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Continue <ChevronRight size={20} />
      </button>
    </div>
  );

  const renderContentPage = () => (
    <div className="h-[calc(100vh-2rem)] grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => setCurrentPage("topic")}
          className="mb-4 text-gray-600 hover:text-blue-600 flex items-center gap-1"
        >
          <ChevronRight className="rotate-180" size={18} /> Back
        </button>
        <textarea
          className="w-full h-[calc(100%-4rem)] p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Start writing your blog post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="mt-4 flex gap-4">
          <button
            onClick={generateContent}
            disabled={contentLoading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {contentLoading ? (
              "Generating..."
            ) : (
              <>
                <Sparkles size={18} /> Generate Content
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">AI Assistant</h2>
        <div className="space-y-4">
          <button
            onClick={checkPlagiarism}
            disabled={pLoading}
            className="w-full bg-white border border-gray-200 p-4 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3"
          >
            <Shield className="text-blue-600" />
            <div className="text-left">
              <h3 className="font-semibold">Plagiarism Check</h3>
              <p className="text-sm text-gray-600">
                {pLoading ? "Checking..." : "Verify content originality"}
              </p>

              {pLoading && <p>{plagiarismStats}</p>}
            </div>
          </button>

          <button
            onClick={refineContent}
            disabled={rloading}
            className="w-full bg-white border border-gray-200 p-4 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3"
          >
            <RefreshCw className="text-purple-600" />
            <div className="text-left">
              <h3 className="font-semibold">Refine Content</h3>
              <p className="text-sm text-gray-600">
                {rloading ? "Refining..." : "Improve writing quality"}
              </p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage("template")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <FileCheck size={20} /> Continue to Templates
          </button>
        </div>

        {plagiarismStats && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-lg">Plagiarism Report</h3>
            <p className="text-sm text-gray-600">
              Similarity: {plagiarismStats.similarity}% <br />
              Sources: {plagiarismStats.sources?.join(", ") || "None"}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTemplatePage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
    {/* Back Button */}
    <button
      onClick={() => setCurrentPage("content")}
      className="mb-6 text-gray-600 hover:text-blue-600 flex items-center gap-2"
    >
      <ChevronLeft size={20} /> Back
    </button>

    {/* Blog Content Container */}
    <div ref={printRef} className="bg-white p-6 rounded-lg shadow-lg">
      {/* Blog Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {selectedTopic}
        </h1>
        <div className="flex justify-center items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>Dr. Mark Twane</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>March 15, 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>8 min read</span>
          </div>
        </div>
      </header>

      {/* Blog Content Rendered from Markdown */}
      <article className="prose prose-lg text-gray-800">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>

    {/* Save as PDF Button */}
    <div className="flex justify-center mt-6">
      <button
        onClick={handleDownloadPDF}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-all flex items-center gap-2"
      >
        <Download size={22} /> Download PDF
      </button>
    </div>
  </div>
  );
  

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Sparkles className="text-blue-600" size={24} />
            <span className="font-semibold text-xl">AI Blog Creator</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8">
        {currentPage === "topic" && renderTopicPage()}
        {currentPage === "content" && renderContentPage()}
        {currentPage === "template" && renderTemplatePage()}
      </main>
    </div>
  );
}

export default TopicSelection;
