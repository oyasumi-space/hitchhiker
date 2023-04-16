import 'package:flutter/material.dart';

class BlackKey extends StatelessWidget {
  const BlackKey(this.alphabet, {super.key});

  final String alphabet;

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'images/blackkeys/$alphabet.png',
    );
  }
}
