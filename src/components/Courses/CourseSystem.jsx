import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCheck, FaLock, FaClock, FaUser, FaStar, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CourseSystem = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({});
  const [userProgress, setUserProgress] = useState({});
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: 'Derecho Penal Básico',
      instructor: 'Dr. Wilson Ipiales',
      description: 'Aprenda los fundamentos del derecho penal ecuatoriano',
      duration: '8 semanas',
      totalLessons: 24,
      price: 100,
      rating: 4.8,
      students: 45,
      image: '/images/courses/penal.jpg',
      category: 'Penal',
      level: 'Básico',
      lessons: [
        {
          id: 1,
          title: 'Introducción al Derecho Penal',
          duration: '15:30',
          videoUrl: 'https://example.com/video1.mp4',
          description: 'Conceptos básicos y fundamentos del derecho penal',
          completed: false
        },
        {
          id: 2,
          title: 'Elementos del Delito',
          duration: '22:15',
          videoUrl: 'https://example.com/video2.mp4',
          description: 'Análisis de los elementos constitutivos del delito',
          completed: false
        },
        {
          id: 3,
          title: 'Tipos Penales',
          duration: '18:45',
          videoUrl: 'https://example.com/video3.mp4',
          description: 'Clasificación y estudio de los tipos penales',
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: 'Derecho Civil Avanzado',
      instructor: 'Dr. Wilson Ipiales',
      description: 'Profundice en el derecho civil y sus aplicaciones prácticas',
      duration: '12 semanas',
      totalLessons: 36,
      price: 150,
      rating: 4.9,
      students: 32,
      image: '/images/courses/civil.jpg',
      category: 'Civil',
      level: 'Avanzado',
      lessons: [
        {
          id: 1,
          title: 'Contratos Civiles',
          duration: '20:00',
          videoUrl: 'https://example.com/video4.mp4',
          description: 'Análisis de contratos y sus elementos',
          completed: false
        },
        {
          id: 2,
          title: 'Responsabilidad Civil',
          duration: '25:30',
          videoUrl: 'https://example.com/video5.mp4',
          description: 'Estudio de la responsabilidad civil extracontractual',
          completed: false
        }
      ]
    },
    {
      id: 3,
      title: 'Derecho de Tránsito',
      instructor: 'Dr. Wilson Ipiales',
      description: 'Todo sobre las leyes de tránsito y procedimientos',
      duration: '6 semanas',
      totalLessons: 18,
      price: 80,
      rating: 4.7,
      students: 56,
      image: '/images/courses/transito.jpg',
      category: 'Tránsito',
      level: 'Intermedio',
      lessons: [
        {
          id: 1,
          title: 'Normativa de Tránsito',
          duration: '16:45',
          videoUrl: 'https://example.com/video6.mp4',
          description: 'Leyes y reglamentos de tránsito vigentes',
          completed: false
        },
        {
          id: 2,
          title: 'Infracciones y Sanciones',
          duration: '19:20',
          videoUrl: 'https://example.com/video7.mp4',
          description: 'Tipos de infracciones y sus sanciones',
          completed: false
        }
      ]
    }
  ];

  const VideoPlayer = ({ lesson }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleTimeUpdate = (e) => {
      setCurrentTime(e.target.currentTime);
      // Actualizar progreso
      const progressPercent = (e.target.currentTime / e.target.duration) * 100;
      updateLessonProgress(lesson.id, progressPercent);
    };

    const handleLoadedMetadata = (e) => {
      setDuration(e.target.duration);
    };

    const togglePlay = () => {
      const video = document.getElementById('course-video');
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
      const video = document.getElementById('course-video');
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e) => {
      const newVolume = e.target.value;
      setVolume(newVolume);
      const video = document.getElementById('course-video');
      video.volume = newVolume;
    };

    const handleSeek = (e) => {
      const video = document.getElementById('course-video');
      const seekTime = (e.target.value / 100) * duration;
      video.currentTime = seekTime;
      setCurrentTime(seekTime);
    };

    const toggleFullscreen = () => {
      const video = document.getElementById('course-video');
      if (!isFullscreen) {
        video.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
      <div className="bg-black rounded-lg overflow-hidden">
        <div className="relative">
          <video
            id="course-video"
            className="w-full h-64 md:h-96"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => {
              setIsPlaying(false);
              markLessonAsCompleted(lesson.id);
            }}
          >
            <source src={lesson.videoUrl} type="video/mp4" />
            Su navegador no soporta el elemento de video.
          </video>

          {/* Controles de video */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300"
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300"
              >
                <FaExpand />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const updateLessonProgress = (lessonId, progress) => {
    setUserProgress(prev => ({
      ...prev,
      [lessonId]: progress
    }));
  };

  const markLessonAsCompleted = (lessonId) => {
    setUserProgress(prev => ({
      ...prev,
      [lessonId]: 100
    }));
    toast.success('¡Lección completada!');
  };

  const getCourseProgress = (course) => {
    if (!course.lessons) return 0;
    const totalLessons = course.lessons.length;
    const completedLessons = course.lessons.filter(lesson => 
      userProgress[lesson.id] === 100
    ).length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  const CourseCard = ({ course }) => {
    const progress = getCourseProgress(course);
    
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = '/images/courses/default.jpg';
            }}
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-medium">
            ${course.price}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 font-medium">{course.category}</span>
            <span className="text-sm text-gray-500">{course.level}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4">{course.description}</p>

          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
            <div className="flex items-center">
              <FaClock className="mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <FaUser className="mr-1" />
              {course.totalLessons} lecciones
            </div>
            <div className="flex items-center">
              <FaStar className="mr-1 text-yellow-400" />
              {course.rating}
            </div>
          </div>

          {progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progreso</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedCourse(course)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {progress > 0 ? 'Continuar' : 'Comenzar'}
            </button>
            <button 
              onClick={() => {
                addToCart({
                  id: `course-${course.id}`,
                  name: course.title,
                  price: course.price,
                  type: 'course',
                  category: course.category
                });
                toast.success('Curso agregado al carrito');
                navigate('/checkout');
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaShoppingCart />
              Comprar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CoursePlayer = ({ course }) => {
    const [activeTab, setActiveTab] = useState('video');
    const currentLessonData = course.lessons[currentLesson];

    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setSelectedCourse(null)}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Volver a los cursos
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reproductor de video */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{currentLessonData.title}</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Lección {currentLesson + 1} de {course.lessons.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentLessonData.duration}
                  </span>
                </div>
              </div>

              <VideoPlayer lesson={currentLessonData} />

              <div className="mt-6">
                <h3 className="font-bold text-lg mb-2">Descripción</h3>
                <p className="text-gray-600">{currentLessonData.description}</p>
              </div>
            </div>
          </div>

          {/* Lista de lecciones */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">Lecciones del Curso</h3>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentLesson
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {userProgress[lesson.id] === 100 ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaPlay className="text-gray-400" />
                        )}
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>
                      {userProgress[lesson.id] === 100 && (
                        <span className="text-green-500 text-sm">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (selectedCourse) {
    return <CoursePlayer course={selectedCourse} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cursos de Derecho</h1>
        <p className="text-xl text-gray-600">
          Aprenda derecho de la mano de expertos profesionales
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseSystem;
