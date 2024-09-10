import 'package:flutter/material.dart';

class Hint extends StatelessWidget {
  const Hint({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        Text(
          'What\'s the food Sunny shouted?',
          style: TextStyle(
            color: Colors.white,
            fontSize: 32,
            fontFamily: 'GameFont',
            decoration: TextDecoration.none,
          ),
        ),
        Text(
          'サニーが叫んだ食べ物の名前は？',
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
