import 'package:flutter/material.dart';

class Hint extends StatelessWidget {
  const Hint({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        Text(
          'What\'s the food the Sun said?aaa',
          style: TextStyle(
            color: Colors.white,
            fontSize: 32,
            fontFamily: 'GameFont',
            decoration: TextDecoration.none,
          ),
        ),
        Text(
          '太陽がしゃべった食べ物の名前は？',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontFamily: 'GameFontJP',
            decoration: TextDecoration.none,
          ),
        ),
      ],
    );
  }
}
