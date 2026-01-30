import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system/legacy';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GamePlayerScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  
  const [gameHtml, setGameHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGameOffline();
  }, []);

  const loadGameOffline = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${id}.zip`;

      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      setGameHtml(fileContent);
    } catch (error) {
      console.error("Failed to load offline game:", error);
      setGameHtml(`
        <html>
          <body style="background: #222; color: #fff; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100%;">
            <div style="text-align: center;">
              <h1>⚠️ Offline Mode</h1>
              <p>Game file loaded from: ${FileSystem.documentDirectory}</p>
              <p>Note: Since 2048 is a ZIP file, Expo Go cannot unzip it natively.</p>
              <p>In a real build, we would unzip here.</p>
            </div>
          </body>
        </html>
      `);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <View style={styles.gameContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{ 
              html: gameHtml || '<h1>Loading...</h1>', 
              baseUrl: ''  
            }}
            style={{ flex: 1, backgroundColor: '#000', opacity: 0.99 }} 
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onError={(e) => console.log("WebView Error:", e.nativeEvent)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#333' 
  },
  backBtn: { padding: 5 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  gameContainer: { flex: 1, backgroundColor: '#000' },
});