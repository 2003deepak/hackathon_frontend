import React, { useState, useEffect } from "react";
import { Search, ChevronRight, Loader2, RefreshCw } from "lucide-react";

function TopicSelection() {
  const [currentPage, setCurrentPage] = useState("topic");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [trendingTopics, setTrendingTopics] = useState([
    "AI in Healthcare",
    "Sustainable Living",
    "Future of Work",
    "Digital Privacy",
    "Mental Wellness",
    "Tech Innovations",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch trending topics from API
  const fetchTrendingTopics = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`https://your-api.com/trending?query=${selectedTopic}`);
      const data = await response.json();
      setTrendingTopics(data.topics || []);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
    setIsGenerating(false);
  };

  // Handle input change
  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Create Amazing Blog Content with AI
        </h1>
        <p className="text-gray-600">
          Generate engaging blog posts in minutes with our AI-powered platform
        </p>
      </div>

      {/* Topic Input Field */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Enter your blog topic..."
          className="w-full px-6 py-4 rounded-xl border border-gray-200 shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedTopic}
          onChange={handleTopicChange}
          disabled={isGenerating}
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Trending Topics Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
        {isGenerating ? (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" /> Generating topics...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setSelectedTopic(topic)}
                className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
              >
                {topic}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Generate Topics Button */}
      <button
        onClick={fetchTrendingTopics}
        className="w-full flex items-center justify-center gap-2 bg-gray-200 py-3 rounded-lg font-medium hover:bg-gray-300 transition disabled:opacity-50"
        disabled={isGenerating}
      >
        <RefreshCw size={20} />
        {isGenerating ? "Generating..." : "Generate Topics"}
      </button>

      {/* Continue Button */}
      <button
        onClick={() => setCurrentPage("content")}
        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
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
            onClick={() => {}}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Generate Content
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">AI Assistant</h2>
        <div className="space-y-4">
          <button
            onClick={() => {}}
            className="w-full bg-white border border-gray-200 p-4 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3"
          >
            <Shield className="text-blue-600" />
            <div className="text-left">
              <h3 className="font-semibold">Plagiarism Check</h3>
              <p className="text-sm text-gray-600">
                Verify content originality
              </p>
            </div>
          </button>

          <button
            onClick={() => {}}
            className="w-full bg-white border border-gray-200 p-4 rounded-lg hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3"
          >
            <RefreshCw className="text-purple-600" />
            <div className="text-left">
              <h3 className="font-semibold">Refine Content</h3>
              <p className="text-sm text-gray-600">Improve writing quality</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage("template")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <FileCheck size={20} /> Continue to Templates
          </button>
        </div>
      </div>
    </div>
  );

  const renderTemplatePage = () => (
    <div className="max-w-6xl mx-auto px-4">
      <button
        onClick={() => setCurrentPage("content")}
        className="mb-4 text-gray-600 hover:text-blue-600 flex items-center gap-1"
      >
        <ChevronRight className="rotate-180" size={18} /> Back
      </button>
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Choose Your Blog Template
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {templates.map((template, index) => (
          <div
            key={index}
            className={`rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
              selectedTemplate === index
                ? "border-blue-500 shadow-lg"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => setSelectedTemplate(index)}
          >
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {}}
        className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <Download size={20} /> Save as PDF
      </button>
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
