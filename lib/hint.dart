import 'package:flutter/material.dart';

class Hint extends StatelessWidget {
  const Hint({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text(
      'What\'s the food the Sun said?',
      style: TextStyle(
        color: Colors.white,
        fontSize: 32,
        fontFamily: 'GameFont',
        decoration: TextDecoration.none,
      ),
    );
  }
}
