import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TOPICS } from '../../constants/dummyData';

export default function VideoPlayerScreen() {
  const { id } = useLocalSearchParams();
  const videoRef = useRef<Video>(null);
  const router = useRouter();
  
  const currentIndex = TOPICS.findIndex((t) => t.id === id);
  const topic = TOPICS[currentIndex];
  const prevTopic = currentIndex > 0 ? TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex < TOPICS.length - 1 ? TOPICS[currentIndex + 1] : null;
  const upNext = TOPICS.filter(t => t.id !== id);

  const [status, setStatus] = useState<any>({});
  const [showControls, setShowControls] = useState(true);
  const [nextCheckpoint, setNextCheckpoint] = useState(60000);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  if (!topic) return <View style={styles.center}><Text>Video not found</Text></View>;

  const formatTime = (millis: number) => {
    if (!millis) return "00:00";
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleControls = () => {
    if (showControls) {
      setShowControls(false);
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    } else {
      setShowControls(true);
      resetControlsTimer();
    }
  };

  const resetControlsTimer = () => {
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (status.isPlaying) setShowControls(false); 
    }, 3000) as unknown as NodeJS.Timeout;
  };

  const togglePlayPause = async () => {
    resetControlsTimer();
    if (videoRef.current) {
      if (status.isPlaying) await videoRef.current.pauseAsync();
      else await videoRef.current.playAsync();
    }
  };

  const skipVideo = (newId: string) => {
    setNextCheckpoint(60000); 
    setModalVisible(false);
    router.replace(`/video/${newId}`);
  };

  const handlePlaybackStatusUpdate = (newStatus: any) => {
    if (newStatus.isLoaded) {
      setStatus(newStatus);
      
      if (newStatus.isPlaying) {
        if (newStatus.positionMillis >= nextCheckpoint && newStatus.positionMillis < nextCheckpoint + 2000) {
          triggerCheckpoint();
        }
      }
    }
  };

  const triggerCheckpoint = async () => {
    if (videoRef.current) await videoRef.current.pauseAsync();
    
    const timeInSeconds = nextCheckpoint / 1000;
    const question = topic.questions?.find(q => Math.abs(q.time - timeInSeconds) < 10) 
                     || { question: "Are you still watching?", options: ["Yes", "No"], correctAnswer: "Yes" };

    setCurrentQuestion(question);
    setModalVisible(true);
  };

  const handleAnswer = async (selectedOption: string) => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setModalVisible(false);
      setNextCheckpoint((prev) => prev + 60000);
      if (videoRef.current) await videoRef.current.playAsync();
    } else {
      Alert.alert("Incorrect", "Please try again to resume the video.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.videoContainer}>
        <TouchableWithoutFeedback onPress={toggleControls}>
          <View style={styles.videoWrapper}>
            <Video
              ref={videoRef}
              style={styles.video}
              source={{ uri: topic.videoUrl }}
              useNativeControls={false}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={true}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />

            {showControls && (
              <View style={styles.overlay}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                   <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>

                <View style={styles.centerControls}>
                  <TouchableOpacity onPress={() => prevTopic && skipVideo(prevTopic.id)} disabled={!prevTopic}>
                    <Ionicons name="play-skip-back" size={30} color={prevTopic ? "white" : "gray"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
                     <Ionicons name={status.isPlaying ? "pause" : "play"} size={40} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => nextTopic && skipVideo(nextTopic.id)} disabled={!nextTopic}>
                    <Ionicons name="play-skip-forward" size={30} color={nextTopic ? "white" : "gray"} />
                  </TouchableOpacity>
                </View>

                <View style={styles.bottomBar}>
                  <Text style={styles.timeText}>{formatTime(status.positionMillis || 0)} / {formatTime(status.durationMillis || 0)}</Text>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${((status.positionMillis || 0) / (status.durationMillis || 1)) * 100}%` }]} />
                  </View>
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>{topic.title}</Text>
        <Text style={styles.description}>{topic.description}</Text>
        <View style={styles.divider} />
        <Text style={styles.sectionHeader}>Up Next</Text>
        {upNext.map((item) => (
           <TouchableOpacity key={item.id} style={styles.nextItem} onPress={() => skipVideo(item.id)}>
             <Image source={{ uri: item.thumbnail }} style={styles.nextThumb} />
             <View style={styles.nextInfo}>
               <Text style={styles.nextTitle}>{item.title}</Text>
               <Text style={styles.nextDesc}>Tap to play</Text>
             </View>
           </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            
            <View style={styles.iconContainer}>
              <Ionicons name="game-controller-outline" size={40} color="#fff" />
            </View>

            <Text style={styles.modalHeader}>Choice Time!</Text>
            <Text style={styles.modalSubText}>{currentQuestion?.question}</Text>

            <View style={styles.optionsContainer}>
              {currentQuestion?.options.map((option: string, index: number) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.optionButton} 
                  onPress={() => handleAnswer(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  videoContainer: { width: '100%', height: 260, backgroundColor: '#000' },
  videoWrapper: { flex: 1 },
  video: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'space-between' },
  backButton: { margin: 20 },
  centerControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 40 },
  playButton: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 50 },
  bottomBar: { padding: 15, width: '100%' },
  timeText: { color: '#fff', fontSize: 12, marginBottom: 8, fontWeight: 'bold' },
  progressBarBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#4A90E2' },
  
  contentContainer: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 14, color: '#444' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  nextItem: { flexDirection: 'row', marginBottom: 15 },
  nextThumb: { width: 100, height: 60, borderRadius: 8, backgroundColor: '#ddd' },
  nextInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  nextTitle: { fontSize: 14, fontWeight: '600' },
  nextDesc: { fontSize: 12, color: '#666' },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '85%', backgroundColor: '#fff', borderRadius: 24, padding: 25, alignItems: 'center', elevation: 10 },
  
  iconContainer: {
    backgroundColor: '#FF6B6B',
    width: 70, height: 70, borderRadius: 35,
    justifyContent: 'center', alignItems: 'center',
    marginTop: -55, marginBottom: 15, borderWidth: 4, borderColor: '#fff'
  },
  modalHeader: { fontSize: 22, fontWeight: '800', color: '#333', marginBottom: 10 },
  modalSubText: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 25 },
  
  optionsContainer: { width: '100%', gap: 12 },
  optionButton: {
    backgroundColor: '#f0f4f8',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e8ed'
  },
  optionText: { fontSize: 16, fontWeight: '600', color: '#2d3436' },
});