// app/(tabs)/index.tsx
import { StyleSheet, FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { TOPICS } from '@/constants/dummyData'; // Ensure this path matches where you put dummyData

export default function VideoListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Video Learning</Text>
      <FlatList
        data={TOPICS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push(`/video/${item.id}`)}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.cta}>▶ Watch Now</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 15 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  card: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#f9f9f9', borderRadius: 12, overflow: 'hidden', elevation: 3 },
  thumbnail: { width: 100, height: 100 },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  desc: { fontSize: 12, color: '#666', marginVertical: 4 },
  cta: { fontSize: 12, color: '#007AFF', fontWeight: 'bold' },
});