import { GAMES } from '@/constants/dummyData';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system/legacy';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GamesScreen() {
  const router = useRouter();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [localGames, setLocalGames] = useState<string[]>([]);

  useEffect(() => {
    checkDownloads();
  }, []);

  const checkDownloads = async () => {
    const loaded = [];
    for (const game of GAMES) {
      const path = `${FileSystem.documentDirectory}${game.id}.zip`;
      const info = await FileSystem.getInfoAsync(path);
      if (info.exists) loaded.push(game.id);
    }
    setLocalGames(loaded);
  };

  const handleDownload = async (game: any) => {
    if (downloading) return;

    setDownloading(game.id);
    
    try {
      const fileUri = `${FileSystem.documentDirectory}${game.id}.zip`;
      
      if (game.downloadUrl.startsWith('bundled://')) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        let content = '';
        if (game.downloadUrl === 'bundled://game1') {
             content = (require('@/constants/bundledGames').SIMPLE_GAME_1);
        } else if (game.downloadUrl === 'bundled://game2') {
             content = (require('@/constants/bundledGames').SIMPLE_GAME_2);
        } else if (game.downloadUrl === 'bundled://game3') {
             content = (require('@/constants/bundledGames').SIMPLE_GAME_3);
        }

        await FileSystem.writeAsStringAsync(fileUri, content);
        
        Alert.alert("Success", `${game.name} is ready to play offline!`);
        setLocalGames((prev) => [...prev, game.id]);

      } else {
        const downloadRes = await FileSystem.downloadAsync(
          game.downloadUrl,
          fileUri
        );

        if (downloadRes.status === 200) {
          Alert.alert("Success", `${game.name} is ready to play offline!`);
          setLocalGames((prev) => [...prev, game.id]);
        } else {
          Alert.alert("Error", "Download failed.");
        }
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not save file.");
    } finally {
      setDownloading(null);
    }
  };

  const handlePlay = (game: any) => {
    router.push({
      pathname: '/game/[id]',
      params: { id: game.id, name: game.name }
    });
  };

  const handleDelete = async (id: string) => {
    await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${id}.zip`);
    setLocalGames((prev) => prev.filter(g => g !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Offline Games</Text>
      
      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isDownloaded = localGames.includes(item.id);
          const isDownloading = downloading === item.id;

          return (
            <View style={styles.card}>
              <Image source={{ uri: item.icon }} style={styles.icon} />
              
              <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>

              <View style={styles.actionArea}>
                {isDownloading ? (
                  <ActivityIndicator color="#4A90E2" />
                ) : isDownloaded ? (
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity 
                      style={styles.playBtn} 
                      onPress={() => handlePlay(item)}
                    >
                      <Text style={styles.btnText}>PLAY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity 
                    style={styles.downloadBtn} 
                    onPress={() => handleDownload(item)}
                  >
                    <Ionicons name="cloud-download-outline" size={20} color="#4A90E2" />
                    <Text style={styles.downloadText}>Get</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 15 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  card: { flexDirection: 'row', marginBottom: 15, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 12, alignItems: 'center' },
  icon: { width: 60, height: 60, borderRadius: 12, backgroundColor: '#eee' },
  info: { flex: 1, marginLeft: 15 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  desc: { fontSize: 12, color: '#666', marginTop: 4 },
  actionArea: { width: 80, alignItems: 'center', justifyContent: 'center' },
  downloadBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#eef6fc' },
  downloadText: { color: '#4A90E2', fontWeight: 'bold', marginLeft: 5, fontSize: 12 },
  playBtn: { backgroundColor: '#4CD964', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, marginBottom: 5 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  deleteText: { color: 'red', fontSize: 14, fontWeight: 'bold', padding: 8 },
});