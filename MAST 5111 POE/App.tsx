import * as React from 'react';

import * as FileSystem from 'expo-file-system';

import { StatusBar } from 'expo-status-bar';

import { Text, View, StyleSheet, Image, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';


import { Picker } from '@react-native-picker/picker'; 

import { useEffect, useState } from 'react';

import { ImageSourcePropType } from 'react-native';




const FILE_PATH = FileSystem.documentDirectory + 'menuItems.json';




type RootTabParamList = {

  Home: undefined;

  MenuItems: undefined;

};




// Declaring an array for courses with correct image type

interface Courses {

  id: number;

  type: string;

  image: ImageSourcePropType;

}




// Declaring an array for menu items

interface MenuItem {

  dishName: string;

  description: string;

  course: string;

  price: string;

}








const coursesArray: Courses[] = [

  { id: 1, type: "Starters", image: require('./assets/starters.png') },

  { id: 2, type: "Soups", image: require('./assets/soup.png') },

  { id: 3, type: "Salads", image: require('./assets/salads.png') },

  { id: 4, type: "Entrees (Meat)", image: require('./assets/meat.png') },

  { id: 5, type: "Entrees (Seafood)", image: require('./assets/seafood.png') },

  { id: 6, type: "Pasta", image: require('./assets/pasta.png') },

  { id: 7, type: "Vegetarian", image: require('./assets/vegetarian.png') },

  { id: 8, type: "Vegan", image: require('./assets/vegan.png') },

  { id: 9, type: "African Cuisine", image: require('./assets/african.png') },

  { id: 10, type: "Sandwiches", image: require('./assets/sandwiches.png') },

  { id: 11, type: "Main Course", image: require('./assets/maincourse.png') },

 
];




const styles = StyleSheet.create({

  container: {

    flex: 1,

    alignItems: 'center',

    backgroundColor: 'white',

  },

  headerContainer: {

    alignItems: 'center',

  },

  logoImage: {

    height: 200,

    width: 200,

    marginTop: 5,

    padding: 0,

  },

  textContainer: {

    height: 70,

    width: 550,

    borderRadius: 15,

    marginRight: 10,

    marginLeft: 10,

    padding: 10,

    backgroundColor: 'white',

    borderWidth: 1,

    borderColor: 'green',

    elevation: 10,

    marginBottom: 25,

  },

  coursesFlat: {

    height: 180,

   marginBottom: 25,

  },

  prepareContainer: {

    flex: 1,

    width: 550,

    height: '100%',

    paddingTop: 0,

    borderRadius: 40,

    marginLeft: 20,

    elevation: 15,

  },

  prepareText: {

    paddingTop: 0,

    fontSize: 28,

    marginBottom: 10,

    textAlign: 'center',

    color: 'green',

  },

  MenuItem: {

    fontSize: 20,

    marginLeft: 20,

    marginBottom: 10,

  },

  MenuItemDescription: {

    fontSize: 20,

    marginLeft: 20,

    marginBottom: 10,

    color: 'green',

  },

  MenuItemCourse: {

    fontSize: 20,

    marginLeft: 20,

    marginBottom: 10,

    borderRadius: 30,

    color: 'green',

  },

  MenuItemPrice: {

    fontSize: 20,

    marginLeft: 20,

    marginBottom: 10,

    borderRadius: 30,

    color: 'green',

  },

  coursesItem: {

    height: 180,

    width: 180,

    marginLeft: 20,

    marginRight: 20,

    alignItems: 'center',

    backgroundColor: 'white',

    borderColor: 'green',

    borderWidth: 2,

    borderRadius: 75,

    elevation: 15,

    marginTop: 0,

  },

  coursesItem2: {

    padding: 10,

    borderBottomWidth: 1,

    borderBottomColor: 'green',

    flexDirection: 'row', // Align children in a row

    alignItems: 'center',  // Center items vertically

  },

  coursesText: {

    textAlign: 'center',

    fontSize: 22,

    marginTop: 15,

  },

  descriptionInput: {

    textAlignVertical: 'top',

    height: 150,

    fontSize: 22,

    color: 'green'

  },

  inputContainer: {

    height: 70,

    width: 550,

    borderRadius: 15,

    padding: 10,

    backgroundColor: 'white',

    borderWidth: 1,

    borderColor: 'gray',

    elevation: 10,

    marginTop: 10,

    marginLeft: 10,

    marginRight: 10,

  },

  input: {

    fontSize: 22,

    color: 'green'

  },

  input2: {

    fontSize: 22,

    color: 'green'

  },

  pickerContainer: {

    height: 70,

    width: 550,

    elevation: 15,

    backgroundColor: 'white',

    borderRadius: 15,

    marginTop: 10,

    marginLeft: 10,

    alignContent: 'center',

    marginRight: 10,

    borderColor: 'gray',

    borderWidth: 1,




  },

  picker: {

    height: 40,

    width: '100%',

    color: 'gray',

  },

  pickerItem: {

    fontSize: 22,

  },

  button: {

    height: 80,

    width: 550,

    elevation: 5,

    backgroundColor: 'silver',

    borderRadius: 15,

    marginTop: 20,

    marginLeft: 10,

    marginRight: 10,

    marginBottom: 40,

  },

  buttonText: {

    textAlign: 'center',

    fontSize: 20,

    color: 'black',

    marginTop: 30,

    

  }

});




// Create the Tab Navigator

const Tab = createBottomTabNavigator<RootTabParamList>();




// Main App Component

export default function App() {

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);




  useEffect(() => {

    const loadMenuItems = async () => {

      try {

        const savedData = await FileSystem.readAsStringAsync(FILE_PATH);

        const parsedData = JSON.parse(savedData);

        setMenuItems(parsedData);

      } catch (error) {

        console.log('Error loading menu items:', error);

      }

    };




    loadMenuItems();

  }, []);




  const handleSave = async (newMenuItem: MenuItem) => {

    const updatedMenuItems = [...menuItems, newMenuItem];

    await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(updatedMenuItems));

    setMenuItems(updatedMenuItems);

  };




  const handleDelete = async (index: number) => {

    const updatedMenuItems = menuItems.filter((_, i) => i !== index);

    setMenuItems(updatedMenuItems);

    await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(updatedMenuItems));

    Alert.alert('Success', 'Menu item deleted!');

  };




  return (

    <NavigationContainer>

      <Tab.Navigator

        screenOptions={({ route }) => ({

          tabBarIcon: ({ color, size }) => {

            let iconName: string = 'alert-circle-outline'; // Default icon




            if (route.name === 'Home') {

              iconName = 'home-outline'; // Icon for Home

            } else if (route.name === 'MenuItems') {

              iconName = 'add-circle-outline'; // Icon for Plus Sign with Circle

            }




            return <Icon name={iconName} size={size} color={color} />;

          },

          tabBarShowLabel: false,

          tabBarActiveTintColor: 'grey',

          tabBarInactiveTintColor: 'white',

          tabBarStyle: {

            backgroundColor: 'green',

          },

        })}

      >

        <Tab.Screen

          name="Home"

          children={() => <HomeScreen menuItems={menuItems} handleDelete={handleDelete} />}

          options={{

            headerStyle: {

              backgroundColor: 'green',

            },

            headerTintColor: 'white',

            headerTitle: () => <Icon name="home-outline" size={24} color="white" />,

          }}

        />

        <Tab.Screen

          name="MenuItems"

          children={() => <MenuItemsScreen handleSave={handleSave} menuItems={menuItems} handleDelete={handleDelete} />}

          options={{

            headerStyle: {

              backgroundColor: 'green',

            },

            headerTintColor: 'white',

            headerTitle: () => <Icon name="add-circle-outline" size={24} color="white" />,

          }}

        />

      </Tab.Navigator>

    </NavigationContainer>

  );

}








// Home Screen Component

function HomeScreen({ menuItems }: { menuItems: MenuItem[] }) {

  const coursesItem = ({ item }: { item: Courses }) => (

    <View style={styles.coursesItem}>

      <Image source={item.image} style={{ width: 90, height: 90, borderRadius: 30, marginTop: 1 }} />

      <Text style={styles.coursesText}>{item.type}</Text>

    </View>

  );




  const renderItem = ({ item }: { item: MenuItem }) => {

    const course = coursesArray.find(course => course.type === item.course);




    return (

      <View style={styles.coursesItem2}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          {course && (

            <Image source={course.image} style={{ width: 150, height: 150, borderRadius: 10, marginRight: 10 }} />

          )}

          <View style={{ flex: 1, justifyContent: 'flex-start' }}>

            <Text style={styles.MenuItem}>{item.dishName}</Text>

            <Text style={styles.MenuItemDescription}>{item.description}</Text>

            <Text style={styles.MenuItemCourse}>{item.course}</Text>

            <Text style={styles.MenuItemPrice}>{item.price}</Text>

          </View>

        </View>

      </View>

    );

  };




  return (

    <View style={styles.container}>

      <View style={styles.headerContainer}>

        <Image source={require('./assets/JoziFoodLogo.png')} style={styles.logoImage} />

        <View style={styles.textContainer}>

          <Text style={styles.input}>Total Menu Items: {menuItems.length}</Text>

        </View>

      </View>




      <View style={styles.coursesFlat}>

        <FlatList

          data={coursesArray}

          horizontal

          showsHorizontalScrollIndicator={false}

          renderItem={coursesItem}

          keyExtractor={(item) => item.id.toString()}

          contentContainerStyle={{ padding: 0 }}

        />

      </View>




      <View style={styles.container}>

        <Text style={styles.prepareText}>Prepared Menu</Text>

        <FlatList

          data={menuItems}

          renderItem={renderItem}

          keyExtractor={(item, index) => index.toString()}

        />

      </View>




      <StatusBar style="auto" />

    </View>

  );

}










// Menu Items Screen Component

function MenuItemsScreen({ handleSave, menuItems, handleDelete }: { handleSave: (newMenuItem: MenuItem) => Promise<void>; menuItems: MenuItem[]; handleDelete: (index: number) => void; }) {

  const [dishName, setDishName] = useState('');

  const [description, setDescription] = useState('');

  const [price, setPrice] = useState('');

  const [selectedCourses, setSelectedCourses] = useState<string>(coursesArray[0].type);




  const saveMenuItem = async () => {

    if (!dishName || !description || !price || !selectedCourses) {

      Alert.alert('Error', 'Please fill out all fields');

      return;

    }




    const newMenuItem: MenuItem = {

      dishName,

      description,

      course: selectedCourses,

      price,

    };




    await handleSave(newMenuItem);




    Alert.alert('Success', 'Menu item saved!');

    setDishName('');

    setDescription('');

    setPrice('');

  };




  const renderMenuItem = ({ item, index }: { item: MenuItem; index: number }) => {

    const course = coursesArray.find(course => course.type === item.course);

    

    return (

      <View style={styles.coursesItem2}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          {course && (

            <Image source={course.image} style={{ width: 150, height: 150, borderRadius: 10, marginRight: 10 }} />

          )}

          <View style={{ flex: 1, justifyContent: 'flex-start' }}>

            <Text style={styles.MenuItem}>{item.dishName}</Text>

            <Text style={styles.MenuItemDescription}>{item.description}</Text>

            <Text style={styles.MenuItemCourse}>{item.course}</Text>

            <Text style={styles.MenuItemPrice}>{item.price}</Text>

          </View>

          <TouchableOpacity onPress={() => handleDelete(index)}>

            <Text style={{ color: 'red' }}>Delete</Text>

          </TouchableOpacity>

        </View>

      </View>

    );

  };




  return (

    <View style={styles.container}>

      <View style={styles.inputContainer}>

        <TextInput

          style={styles.input2}

          placeholder="Dish Name"

          value={dishName}

          onChangeText={setDishName}

        />

      </View>




      <View style={styles.inputContainer}>

        <TextInput

          style={styles.descriptionInput}

          placeholder="Description"

          value={description}

          onChangeText={setDescription}

          numberOfLines={4}

        />

      </View>




      <View style={styles.pickerContainer}>

        <Picker

          selectedValue={selectedCourses}

          onValueChange={(itemValue) => setSelectedCourses(itemValue)}

          style={styles.picker}

        >

          {coursesArray.map((course) => (

            <Picker.Item key={course.id} label={course.type} value={course.type} style={styles.pickerItem} />

          ))}

        </Picker>

      </View>




      <View style={styles.inputContainer}>

        <TextInput

          style={styles.input2}

          placeholder="Price"

          value={price}

          onChangeText={setPrice}

        />

      </View>




      <TouchableOpacity style={styles.button} onPress={saveMenuItem}>

        <Text style={styles.buttonText}> SAVE </Text>

      </TouchableOpacity>




      <Text style={styles.prepareText}>Prepared Menu</Text>

      <FlatList

        data={menuItems}

        renderItem={renderMenuItem}

        keyExtractor={(item, index) => index.toString()}

      />

    </View>

  );

}