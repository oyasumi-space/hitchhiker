import 'package:flutter/material.dart';
import 'package:hitchhiker/home.dart';

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Entrance',
      theme: ThemeData(fontFamily: 'GameFont'),
      home: const Home(),
    );
  }
}
