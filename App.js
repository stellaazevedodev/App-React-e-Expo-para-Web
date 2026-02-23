import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles/styles';

const Stack = createNativeStackNavigator();

const cards = [
  { id: '1', nome: 'Cavaleiro', elixir: 3, raridade: 'Comum', img: require('./assets/cards/cavaleiro.png') },
  { id: '2', nome: 'Arqueiras', elixir: 3, raridade: 'Comum', img: require('./assets/cards/arqueiras.png') },
  { id: '3', nome: 'Dragão Bebê', elixir: 4, raridade: 'Épica', img: require('./assets/cards/dragao.png') },
];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚔️ Clash Info ⚔️</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cartas')}
      >
        <Text style={styles.buttonText}>Ver Cartas</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
}

function CardsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { card: item })}
          >
            <Image source={item.img} style={styles.cardImageSmall} resizeMode="cover" />
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.nome}</Text>
              <Text style={styles.cardDetail}>Elixir: {item.elixir} ⚡</Text>
              <Text style={styles.cardDetail}>Raridade: {item.raridade}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

function CardDetailScreen({ route }) {
  const { card } = route.params;
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>{card.nome}</Text>
      <View style={styles.detailCard}>
        <Image source={card.img} style={styles.cardImageLarge} resizeMode="contain" />
        <Text style={styles.detailText}>Elixir: {card.elixir} ⚡</Text>
        <Text style={styles.detailText}>Raridade: {card.raridade}</Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#13035eff' },
          headerTintColor: '#FFD700',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        }}
      >
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="Cartas" component={CardsScreen} />
        <Stack.Screen name="Detalhes" component={CardDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


