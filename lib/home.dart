import 'package:flutter/material.dart';
import 'package:hitchhiker/display.dart';
import 'package:hitchhiker/keyboard.dart';

import 'hint.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      child: const Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Hint(),
          SizedBox(height: 32),
          Display(),
          SizedBox(height: 32),
          Keyboard(),
        ],
      ),
    );
  }
}
