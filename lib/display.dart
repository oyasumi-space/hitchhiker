import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hitchhiker/blackkey.dart';

final displayProvider = StateProvider(
  (ref) {
    return "";
  },
);

class Display extends ConsumerWidget {
  const Display({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final answer = ref.watch(displayProvider);
    return SizedBox(
      height: 36,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: answer.split('').map((e) {
          return SizedBox(
            width: 36,
            height: 36,
            child: BlackKey(e),
          );
        }).toList(),
      ),
    );
  }
}
