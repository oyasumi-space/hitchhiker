import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'display.dart';

class BackSpaceButton extends ConsumerWidget {
  const BackSpaceButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () {
          ref.read(displayProvider.notifier).update(
            (state) {
              if (state.isEmpty) {
                return state;
              }
              return state.substring(0, state.length - 1);
            },
          );
        },
        child: SizedBox(
          width: 36,
          height: 36,
          child: Image.asset('assets/images/bs.png'),
        ),
      ),
    );
  }
}
