import 'package:flutter/material.dart';
import 'package:hitchhiker/blackkey_button.dart';

import 'backspace_button.dart';

class Keyboard extends StatelessWidget {
  const Keyboard({super.key});

  static const _keys = "qwertyuiop asdfghjkl zxcvbnm<";

  @override
  Widget build(BuildContext context) {
    return Column(
      children: _keys
          .split(' ')
          .map(
            (e) => Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: e.split('').map((e) {
                if (e == '<') {
                  return const BackSpaceButton();
                }
                return BlackKeyButton(e);
              }).toList(),
            ),
          )
          .toList(),
    );
  }
}
